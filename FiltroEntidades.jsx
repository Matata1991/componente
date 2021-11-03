import {
    Spacer,
    Heading,
    Flex,
    Box,
    Table,
    Select,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Button,
    Spinner
  } from "@chakra-ui/react"
import { useState, useEffect }  from 'react'
import { get } from '../utils/Mock';

const FiltroEntidades = () => {

const [cargando, setCargando] = useState(true)
const [usuarios, setUsuarios] = useState([])
const [select, setSelect] = useState(true)
const [mostrarTodos, setMostrarTodos] = useState(true)

get 
    .then(respuesta =>{
        setUsuarios(respuesta)
    })
    .catch(error => console.log(error))
    .finally(() => setCargando(false))  

const todosLosUsuarios = usuarios.map(usuario => 
    <Tr>
    <Td>{usuario.apellido}</Td>
    <Td>{usuario.nombre}</Td>
    <Td>{usuario.dni}</Td>
    <Td>{usuario.aplicacion}</Td>
    <Td><Button colorScheme="red" size="sm">Desenrolar</Button></Td>
    </Tr>
    ) 
const usuariosFiltrados = usuarios.filter(usuario => usuario.aplicacion === select).map(usuario => 
    <Tr>
    <Td>{usuario.apellido}</Td>
    <Td>{usuario.nombre}</Td>
    <Td>{usuario.dni}</Td>
    <Td>{usuario.aplicacion}</Td>
    <Td><Button colorScheme="red" size="sm">Desenrolar</Button></Td>
    </Tr>
    )

useEffect(() => {
    console.log("cambia")
    console.log(select)
    console.log(mostrarTodos)
}, [select])
    

const valorSelect = (e) => {
    setSelect(e.target.value)
        setMostrarTodos(false)
}

    return (
        <>
        <Flex 
            ml="7%"
            mt="2%"    
        >
            <Heading size="md" as="cite">Usuarios Enrolados</Heading>
        </Flex>
        <Flex 
            ml="7%"
            mt="5%"    
        >
            <Box fontSize="lg"
            as="cite">
                Red Link
            </Box>
            <Spacer />
            <Box
                w="30%"
                mr="40%"
            >
                <Select 
                    value={select}
                    onChange={valorSelect}
                    >
                    <option 
                        value="Todas las aplicaciones"
                        onClick={() => {
                            if (mostrarTodos === false){
                                setMostrarTodos(!false)
                            }
                        }}
                    >
                        Todas las aplicaciones
                    </option>
                    { usuarios.map(usuario => 
                    <option 
                        value={usuario.aplicacion}
                    >
                        {usuario.aplicacion}
                    </option>
                    ) } 
                </Select>  
            </Box>
        </Flex>
        <Flex 
            w="88%"
            ml="7%"
            mt={35}    
        >
        <Table 
        variant="striped" 
        bg='gray.200'
        >
            <Thead>
                <Tr>
                <Th>Apellido</Th>
                <Th>Nombre</Th>
                <Th>DNI</Th>
                <Th>Aplicacion</Th>
                <Th>Acciones</Th>
                </Tr>
            </Thead>
            <Tbody>
                    { 
                        mostrarTodos ? 
                        todosLosUsuarios :
                        usuariosFiltrados
                    }
            </Tbody>
        </Table>
        </Flex>
        
        </>
    )
}

export default FiltroEntidades
