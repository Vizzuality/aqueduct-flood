#!groovy
node {
  currentBuild.result = "SUCCESS"
  // checkout sources
  checkout scm
  try {
    stage('Deploy') {
      if (env.BRANCH_NAME == "develop") {
        sshagent (credentials: ['psa-staging']) {
          sh 'ssh ${PSA_STAGING} "cd /home/ubuntu/criminal-psa && ./install.sh"'
        }
      }else if (env.BRANCH_NAME == "master") {
        sshagent (credentials: ['psa-staging']) {
          sh 'ssh ${PSA_PROD} "cd /home/ubuntu/criminal-psa && ./install.sh"'
        }
      } else {
      }
      notifySuccessful()
    }
  } catch (err) {
    currentBuild.result = "FAILURE"
    notifyFailed()
    throw err
  }
}
def notifySuccessful() {
  slackSend (color: '#00FF00', channel: '#aqueduct', message: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
  emailext (
      subject: "SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>SUCCESSFUL: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
def notifyFailed() {
  slackSend (color: '#FF0000', channel: '#aqueduct', message: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
  emailext (
      subject: "FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]'",
      body: """<p>FAILED: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]':</p>
        <p>Check console output at "<a href="${env.BUILD_URL}">${env.JOB_NAME} [${env.BUILD_NUMBER}]</a>"</p>""",
      recipientProviders: [[$class: 'DevelopersRecipientProvider']]
    )
}
