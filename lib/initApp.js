function onElementHeightChange(elm, callback) {
    var lastHeight = elm.getBoundingClientRect().height, newHeight;
  
    (function run() {
      newHeight = elm.getBoundingClientRect().height;
      if (lastHeight !== newHeight)
        callback(newHeight)
      lastHeight = newHeight
      if (elm.onElementHeightChangeTimer)
        clearTimeout(elm.onElementHeightChangeTimer)
  
      elm.onElementHeightChangeTimer = setTimeout(run, 200)
    })()
  }
module.exports = (name) => {
    window.addEventListener("load",()=>{
        window.parent.postMessage({height:document.body.getBoundingClientRect().height},'*');
        onElementHeightChange(document.body, function() {
          window.parent.postMessage({height:document.body.getBoundingClientRect().height},'*');
        })
        window.addEventListener("message", (message)=>{
          if(message.data.theme){
            if(message.data.theme === 'dark'){
            document.body.classList.add('darkTheme');
            }
          }
          if(message.data.token){
              window.localStorage.setItem(name + '.token',message.data.token)
          }
          if(message.data.brand){
            document.documentElement.style.setProperty("--brand", message.data.brand);
          }
          if(message.data.props){
            return message.data.props;
          }
        });
      })
}