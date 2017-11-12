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
                sh 'npm install'
            }
        }
    }
}
