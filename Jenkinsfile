pipeline {
    agent any
    environment {
        CI = 'true'
    }
    stages {
        stage('Deploy for production') {
            when {
                branch 'master'
            }
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'servercredential', keyFileVariable: 'KEY', passphraseVariable: 'PASSPHRASE', usernameVariable: 'USERNAME'), string(credentialsId: 'myserverip', variable: 'IP')]) {
                    echo 'Sync...'
                    sh 'rsync -avrt --delete --exclude \'.git\' --rsh=\'ssh -p 22\' ./ $USERNAME@$IP:/$USERNAME/react-pwa-id.rizalibnu.com/'

                    echo 'Build Docker...'
                    sh '''
                    ssh -t -i "$KEY" "$USERNAME"@"$IP" -p 22 "cd /$USERNAME/react-pwa-id.rizalibnu.com && sh start.sh"
                    '''
                }
            }
        }
    }
}