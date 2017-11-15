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
                sh 'echo ${USER}'
                sh 'cd /tmp'
                sh 'rm -rf *'
                git
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
                sh 'git config --global user.email "ndl93@live.com"'
                sh 'git config --global user.name "nickl93"'
                sh 'touch README.md'
                sh 'git add --all'
                sh 'git commit -m "initial"'
                sh 'git push --force https://git.heroku.com/aqueous-harbor-56769.git HEAD:master'
            }
        }
    }
}
