
export default class ServiceWorker
{
    constructor(){}

    registerServiceWorker(path)
    {
        if(!navigator.serviceWorker) return;

        navigator.serviceWorker.register(path).then(() => {

            console.log("Registration Completed");

        }).catch((error) => {
            
            console.log(error);
        })
    }
}