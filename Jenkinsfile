pipeline {
    agent {
        docker {
            image 'node:8'
            args '-u root:root'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd /tmp'
                sh 'cd rm -rf *'
                checkout scm
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('deploy') {
            steps {
                sh 'git commit -m "initial"'
                sh 'git push --force heroku master'
            }
        }
    }
}
