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
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('deploy') {
            steps {
                sh 'git remote add heroku https://git.heroku.com/aqueous-harbor-56769.git'
                sh 'git push heroku master'
            }
        }
    }
}
