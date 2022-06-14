pipeline {
    agent any
    environment {
        ENV_NAME = "${env.GIT_BRANCH.contains('pr') ? 'PR' : env.GIT_BRANCH.substring(env.GIT_BRANCH.indexOf('/') + 1)}"
        DO_IMAGE_NAME = "mazueraalvaro/shopcrm-back"
        dockerImage = ""
        DO_IMAGE_TAG = ""
    }
    stages {
        stage('Install Dependencies') {
            agent { 
                docker { 
                    image 'node:14'
                    reuseNode true
                    alwaysPull false
                }
            }
            steps {
                sh 'npm install'
            }
        }
        stage('Static Analysis') {
            agent { 
                docker { 
                    image 'node:14'
                    reuseNode true
                    alwaysPull false
                }
            }
            steps {
                echo "Build!! ${env.ENV_NAME} ${env.GIT_BRANCH}"
                sh 'npm run lint'
            }
        }
        stage('Build') {
            agent { 
                docker { 
                    image 'node:14'
                    reuseNode true
                    alwaysPull false
                }
            }
            steps {
                echo "Build!! ${env.ENV_NAME} ${env.GIT_BRANCH}"
                sh 'npm build'
            }
        }
        stage('Test') {
            agent { 
                docker { 
                    image 'node:14'
                    reuseNode true
                    alwaysPull false
                }
            }
            steps {
                sh 'npm test'
            }
        }
        stage('Image Build') {
            when {
                expression { return !env.GIT_BRANCH.contains('pr')}
            }
            steps{
                script {
                    dockerImage = docker.build DO_IMAGE_NAME
                }
            }            
        }
        stage('Publish'){
            when {
                expression { return !env.GIT_BRANCH.contains('pr')}
            }
            environment {
                registryCredential = 'dockerhublogin'
                }
            steps{
                script {
                    DO_IMAGE_TAG = "${BUILD_NUMBER }-${ENV_NAME}"
                    docker.withRegistry( 'https://registry.hub.docker.com', registryCredential ){
                        dockerImage.push(DO_IMAGE_TAG)
                    }
                }
            }
        }
        stage('Generate'){
            agent { 
                docker { 
                    image 'node:14'
                    reuseNode true
                    alwaysPull false
                }
            }
            when {
                expression { return !env.GIT_BRANCH.contains('pr')}
            }
            steps{
                sh "DO_IMAGE_TAG=${DO_IMAGE_NAME}:${DO_IMAGE_TAG} npm run k8s:generate deployment deployment"
                sh "DO_IMAGE_TAG=${DO_IMAGE_NAME}:${DO_IMAGE_TAG} npm run k8s:generate service service"
            }
        }
        stage('Deploy to Kubernetes') {
            
            when {
                expression { return !env.GIT_BRANCH.contains('pr')}
            }
            steps {
                kubernetesDeploy(configs: "k8s/deployment-${env.ENV_NAME}.yml", kubeconfigId: "kubernetes")
                kubernetesDeploy(configs: "k8s/service-${env.ENV_NAME}.yml", kubeconfigId: "kubernetes")
            }
        }
    }
}