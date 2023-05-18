const btnJob = document.getElementById('btn-job');
// const githubForm = document.getElementById('')

btnJob.addEventListener('click', applytoJob);

const candidat = {
  isProgrammer: false,
  isCool: true,
}

// function applytoJob() {
//   console.log('La décision est en cours...')
//   startDecisionProcess()
//     .then(result => {
//     console.log('result', result);
//     })
//     .catch((err) => {
//     console.log('err', err);
//   });
//   console.log('Juste après startDecisionProcess')
// }

async function applytoJob() {
  console.log('La décision est en cours...')
  try {
    const result = await startDecisionProcess()
    console.log('result', result);
  } catch (err) {
    console.log('err', err);
  }
  console.log('Juste après startDecisionProcess')
}

function startDecisionProcess() {
  return new Promise((resolve, reject) => {
    console.log('Recruteur - Pendant ce temps je reçois d autres candidats')
    setTimeout(() => {
      if (candidat.isProgrammer && candidat.isCool) {
        console.log('avant resolve')
        resolve('Recruteur - bienvenue dans notre entreprise')
      } else {
        console.log('avant reject')
        reject('Recruteur - Malgré tout l intérêt de votre candidature, nous sommes au regret de blablabla')
      }
    }, 2000);
   });
}

console.log('Après la function applyToJob');
