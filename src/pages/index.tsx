import { FormEvent, useContext, useState } from "react"
import Head from "next/head"
import Image from 'next/image'
import styles from '../../styles/Home.module.scss'

import logoImg from '../../public/logo.svg'

import {Input} from '../components/ui/input'
import {Button} from '../components/ui/Button'

import { AuthContext } from "../contexts/AuthContext"
import Link from "next/link"
import { canSSRGuest } from '../utils/canSSRGuest'

export default function Home(){
  const {signIn} = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)
  async function handleLogin(event: FormEvent) {
    event.preventDefault();

    if(email===''|| password===''){
      return;
    }
    setLoading(true)
    let data = {
    email, 
    password
    }
    signIn(data)
    setLoading(false)

  }
  return(
   <>
   <Head>
    <title>Sujeto Pizza - Faça seu login</title>
   </Head>
   <div>
    <div className={styles.containerCenter}>
      <Image src = {logoImg} alt="Logo Sujeito Pizza"/>

      <div className={styles.login}>
        <form onSubmit={handleLogin}>
          <Input
          placeholder="Digite seu Email" type="text" value={email} 
          onChange={(e) => setEmail(e.target.value)}
          />
          <Input
          placeholder="Digite sua senha" type="password" value={password} 
          onChange={(e) => setPassword(e.target.value)}
          />
          <Button
          type="submit"
          loading={loading}
          >
            Acessar
          </Button>
        </form>
        <Link className={styles.text} href={"/signup"}> Não possui uma conta? Cadastre-se</Link>
      </div>
    </div>
   </div>
   </>
  )
}
 
export const getServerSideProps = canSSRGuest(async (ctx) =>{
  return{
    props:{}
  }
})