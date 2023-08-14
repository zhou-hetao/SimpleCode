import { rulseToken } from "@/api/user"

const Guardsman = function(to, from, next){
    if(to.meta.title){
        document.title = to.meta.title;
      }    
    if (to.matched.length === 0) {
        next('/404')
      } else {
       if(to.path == '/login'){
        next()
       }else{
        rulseToken(localStorage.getItem('token')).then((res)=>{
            if(res.code == 200){
                next()
            }else{
                next('/login')
            }
        })
       }
        
      }
}
export default Guardsman