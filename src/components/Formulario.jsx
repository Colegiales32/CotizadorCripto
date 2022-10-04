import {useState,useEffect} from 'react'
import styled from '@emotion/styled'
import Error from './Error';
import useSelectMonedas from '../hooks/useSelectMonedas';

const InputSubmit= styled.input `
background-color:#9497FF ;
border: none;
width: 100%;
padding: 10px;
color: #FFF;
font-weight: 700;
text-transform: uppercase;
font-size: 20px;
border-radius: 5px;
transition:background-color .3s ease ;
margin-top: 20px;

&:hover {
    background-color: #7A7DFE;
    cursor: pointer;
}
`;

const Formulario = ({setMonedas}) => {
    
        const monedas = [
            {id:'USD', nombre:'Dolar Estadounidense'},
            {id:'MXN', nombre:'Peso Mexicano'},
            {id:'EUR', nombre:' Euro'},
            {id:'GBP', nombre:'Libra Esterlina'}
        ]
    
const [criptos,setCriptos] = useState([])
const [error,setError] = useState(false)

    const [moneda,SelectMonedas] = useSelectMonedas('Selecciona tu Moneda', monedas)
    const [criptomoneda,SelectCriptomonedas] = useSelectMonedas('Selecciona tu Criptomoneda', criptos)


useEffect(() => {

 const consultarApi = async () => {
const url="https://min-api.cryptocompare.com/data/top/mktcapfull?limit=20&tsym=USD"

const respuesta = await fetch(url)
const resultado = await respuesta.json()


const arrayCripto = resultado.Data.map(cripto =>{
    const objeto = {
        id:cripto.CoinInfo.Name,
        nombre:cripto.CoinInfo.FullName
    }
   return objeto
 })
 setCriptos(arrayCripto)
 }
 consultarApi()
}, [])

const handleSubmit = e =>{
    e.preventDefault()

    if([moneda,criptomoneda].includes('')) {
       setError(true)
        return
    }
    
    setError(false)
    setMonedas({
        moneda,
        criptomoneda
    })
}

    return (
        <>
{error && <Error>Todos los campos son obligatorios</Error>}

    <form onSubmit={handleSubmit}>
      < SelectMonedas />

      < SelectCriptomonedas />
    


        <InputSubmit type="submit" value="Cotizar" />
    </form>
    </>
  )
}

export default Formulario