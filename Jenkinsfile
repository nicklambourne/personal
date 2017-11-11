pipeline {
    agent {
        docker {
            image 'node:6-alpine'
            args '-p 3000:3000'
            customWorkspace '~'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'cd /tmp/'
                checkout scm
                sh 'sudo npm install'
            }
        }
    }
}
