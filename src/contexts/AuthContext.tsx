import {createContext, ReactNode, useState, useEffect} from 'react'
import { destroyCookie, parseCookies, setCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient'
import {toast} from 'react-toastify';

type AuthContextData = {
  user: UserProps;
  isAuthenticate: boolean;
  signIn: (credentials: SignInProps) => Promise<void>;
  signOut: () => void
  signUp:(credentials: SignUpProps) =>Promise<void>;
}

type UserProps = {
  id: string;
  name: string;
  email: string;
}

type SignInProps ={
  email: string;
  password: string;
}
type SignUpProps ={
  name: string;
  email: string;
  password: string;
}
type AuthProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextData)

export function signOut(){
  try{
    destroyCookie(undefined, '@nextauth.token')
    Router.push('/')
  }catch{
    console.log('erro ao deslogar')
  }
}
export function AuthProvider({children}: AuthProviderProps){
  const [user, setUser] = useState<UserProps>()
  const isAuthenticate = !!user;
useEffect(() => {
  // tentar pegar algo no cookie
  const {'@nextauth.token':token} = parseCookies();

  if(token){
    api.get('/me').then(response => {
      const {id, name, email} = response.data;

      setUser({
        id,
        name,
        email
      })
    })
    .catch(() => {
      //se deu erro deslogamos o user
      signOut();
    })
  }
})
  async function signIn({ email, password }: SignInProps){
    try{
        const response = await api.post('/session', {
            email,
            password

        })
        // console.log(response.data);
        const {id, name, token} = response.data;

        setCookie(undefined, '@nextauth.token', token, {
          maxAge: 60 * 60 * 24 * 30, // Expirar em 1 mes
          path: "/" //Caminhos que terao os cookies
        })

        setUser({
          id,
          name,
          email,
        })
        //Passar para proximas requisições o token
        api.defaults.headers['Authorization'] = `Bearer ${token}`

        //Redirecionar o user para o /dashboard
        toast.success('logado com sucesso!')
        Router.push('/dashboard')
    }catch(err){
      toast.error('logado com falha!')
      console.log("errou ao acessar", err)
    }
  }
  async function signUp({name, email, password}: SignUpProps){
    try{
      const response = await api.post('/users',{
        name, 
        email,
        password
      })
      toast.success('logado com sucesso!')
      Router.push('/')
    }catch(err){
      toast.error('logado com falha!')
      console.log("erro ao cadastrar", err)
    }
  }
  return(
    <AuthContext.Provider value={{user, isAuthenticate, signIn, signOut, signUp}}>
      {children}
    </AuthContext.Provider>
  )
}