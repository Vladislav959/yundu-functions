module.exports = (name)=>{
        return new Promise((resolve,reject) => {
          fetch('https://api.yundu.co/apps/getuser',{method:'POST',headers:{'Content-Type':'application/json;charset=utf-8','x-access-token':localStorage.getItem(name+'.token')}}).then(response => response.json()).then(res =>{
          if(res.status === 'ok'){
             return resolve(res);
            }
            else{
                return reject(res);
            }
        })
        })
}