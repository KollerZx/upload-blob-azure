
import cluster from 'node:cluster'
import os from 'node:os'


const runPrimaryProcess = () => {
  const processesCount = os.cpus().length
  for (let i = 0; i < processesCount; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.log(`Worker ${worker.process.pid} crashed. Starting a new one...`)
      cluster.fork()
    }
  })
}

const runWorkerProcess = async () => {
  await import('./server')
}

cluster.isPrimary ? runPrimaryProcess() : runWorkerProcess()

