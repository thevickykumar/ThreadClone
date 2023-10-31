import Env from "./config/env";
import {headers} from 'next/headers'

export async function getPosts(){
    const res = await fetch(`${Env.APP_URL}/api/post`,{
      cache:"no-cache",
      headers:headers(),
    });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const response = await res.json();
    
      return response?.data;
    }


    export async function getUserPosts(){
      const res = await fetch(`${Env.APP_URL}/api/user/post`,{
        cache:"no-cache",
        headers:headers(),
      });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const response = await res.json();
      
        return response?.data;
      }
 // get user Users

      export async function getUsers(){
        const res = await fetch(`${Env.APP_URL}/api/user`,{
          cache:"no-cache",
          headers:headers(),
        });
          if (!res.ok) {
            throw new Error("Failed to fetch posts");
          }
          const response = await res.json();
        
          return response?.data;
        }
// to get single post
        export async function getPost(id:number){
          const res = await fetch(`${Env.APP_URL}/api/post/${id}`,{
            cache:"no-cache",
            headers:headers(),
          });
            if (!res.ok) {
              throw new Error("Failed to fetch posts");
            }
            const response = await res.json();
          
            return response?.data;
          }
        

          export async function getUserComments(){
            const res = await fetch(`${Env.APP_URL}/api/user/comment`,{
              cache:"no-cache",
              headers:headers(),
            });
              if (!res.ok) {
                throw new Error("Failed to fetch posts");
              }
              const response = await res.json();
            
              return response?.data;
            }
   // get User(suggestion) 
    
   export async function getUser(id:number){
    const res = await fetch(`${Env.APP_URL}/api/user/${id}`,{
      cache:"no-cache",
      headers:headers(),
    });
      if (!res.ok) {
        throw new Error("Failed to fetch posts");
      }
      const response = await res.json();
    
      return response?.data;
    }

    // get Notifications
    
    export async function getNotifications(){
      const res = await fetch(`${Env.APP_URL}/api/notifications`,{
        cache:"no-cache",
        headers:headers(),
      });
        if (!res.ok) {
          throw new Error("Failed to fetch posts");
        }
        const response = await res.json();
      
        return response?.data;
      } 

      //explore

      export async function exploreUsers(query:string){
        const res = await fetch(`${Env.APP_URL}/api/explore?query=${query}`,{
          cache:"no-cache",
          headers:headers(),
        });
          if (!res.ok) {
            throw new Error("Failed to fetch posts");
          }
          const response = await res.json();
        
          return response?.data;
        } 