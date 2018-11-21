pipeline {
    agent {
        docker {
            image 'node:8'
            args '-u root:root -v /var/lib/jenkins/.netrc:/root/.netrc'
        }
    }
    stages {
        stage('Build') {
            steps {
                sh 'pwd'
                checkout scm
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                sh 'git push --force git@git.heroku.com/aqueous-harbor-56769.git HEAD:master'
            }
        }
    }
}