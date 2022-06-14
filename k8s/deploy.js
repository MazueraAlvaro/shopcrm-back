/* eslint-disable @typescript-eslint/no-var-requires */
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const config = require('./placeholders.json');
const environment = process.env.ENV_NAME;

const placeholders = config.environments.find((el) => el.name === environment);
if (!placeholders) throw new Error(`Placeholders for ${environment} not found`);

try {
  const file = process.argv[2];
  const kind = process.argv[3];
  const ymlData = readYaml(file);
  if (kind === 'deployment') buildDeploymentYaml(ymlData);
  else if (kind === 'service') buildServiceYaml(ymlData);
  else throw new Error('No file kind specified');
  writeYaml(ymlData, file);
} catch (e) {
  console.error('There was an error generating k8s yaml files');
  throw e;
}

function readYaml(kind) {
  const yamlFileName = path.resolve(`${__dirname}/${kind}.yml`);
  const yamlFile = fs.readFileSync(yamlFileName, 'utf-8');
  return yaml.loadAll(yamlFile)[0];
}

function buildDeploymentYaml(data) {
  const container = data.spec.template.spec.containers[0];
  container.image = process.env.DO_IMAGE_TAG;
  const containerPort = container.ports[0];
  containerPort.containerPort =
    placeholders.placeholders[containerPort.containerPort];
}

function buildServiceYaml(data) {
  const servicePorts = data.spec.ports[0];
  servicePorts.port = placeholders.placeholders[servicePorts.port];
  servicePorts.targetPort = placeholders.placeholders[servicePorts.targetPort];
  servicePorts.nodePort = placeholders.placeholders[servicePorts.nodePort];
}

function writeYaml(data, kind) {
  const yamlStr = yaml.dump(data);
  const yamlFileName = `${__dirname}/${kind}-${environment}.yml`;
  fs.writeFileSync(yamlFileName, yamlStr, 'utf-8');
}
