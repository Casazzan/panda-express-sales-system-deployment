import {Box,Button,ButtonGroup,Flex,HStack,VStack,Input,Text,} from '@chakra-ui/react'
import {useJsApiLoader,GoogleMap,Marker,Autocomplete,DirectionsRenderer,} from '@react-google-maps/api'
import { useRef, useState } from 'react'
import './CustMainPage.css'
import PandaMarkerImg from './pandaMapMarker.png'

const center = { lat: 30.6122297, lng: -96.3412229 }
const libraries = ['places']
  
function PandaMap() {
    
    const { isLoaded } = useJsApiLoader({

      googleMapsApiKey: "AIzaSyDRLwszWy-BQ5__YiL6IlwX2CML_1hZn74",
      libraries,

    })

    
    const google = window.google
  
    const [map, setMap] = useState (null)
    const [directionsResp, setDirectionsResponse] = useState(null)
    const [length, setDistance] = useState('')
    const [time, setDuration] = useState('')
  
    const startRef = useRef()
    const endRef = useRef()
  
    if (!isLoaded) { return <div> Loading... </div> }
  
    async function search() {

      if (startRef.current.value === '' || endRef.current.value === '') {

        return

      }

      // eslint-disable-next-line no-undef
      const directions = new google.maps.DirectionsService()

      const mapRoute = await directions.route({

        origin: startRef.current.value,
        destination: endRef.current.value,

        // eslint-disable-next-line no-undef
        travelMode: google.maps.TravelMode.DRIVING,

      })

      setDirectionsResponse(mapRoute)
      setDistance(mapRoute.routes[0].legs[0].distance.text)
      setDuration(mapRoute.routes[0].legs[0].duration.text)

    }
  
    function resetMap() {

      setDirectionsResponse(null)
      setDistance('')
      setDuration('')
      
      startRef.current.value = ''
      endRef.current.value = ''

    }

  
    return (

      <Flex position='relative' h='100vh' w='100vw' flexDirection='column' alignItems='center'>
        
        <Box className = "mapBox" position='absolute' left={0} top={0} h='100%' w='100%'>
         
          <GoogleMap
            center={center}
            zoom={15}
            mapContainerStyle={{ width: '100%', height: '100%' }}
            options={{ zoomControl: false, streetViewControl: false, mapTypeControl: false, fullscreenControl: false,}}
            onLoad={map => setMap(map)}
            
          >
            <Marker position={{lat: 30.6122297, lng: -96.3412229}} tile = "MSC Panda" /> {}
            <Marker position={{lat: 30.617870, lng: -96.323310}} tile = "Texas Panda" /> {}
            <Marker position={{lat: 30.623080, lng: -96.336930}} tile = "Polo Panda" /> {}
     

            <Marker position={center} /> {directionsResp && ( <DirectionsRenderer directions={directionsResp} /> )}

            

          </GoogleMap>

        </Box>

        <Box className='inputBox'
          p={3}
          m={3}
          borderRadius='lg'
          shadow='base'
          minW='container.md'
          zIndex='1'
          bgColor='#8b0909'
        >
          <HStack spacing={2} justifyContent='space-between'>

            <Box className='startBox' flexGrow={1} bgColor='white'>

              <Autocomplete>
                <Input type='text' placeholder='Enter Starting Point' ref={startRef} />
              </Autocomplete>

            </Box>

            <Box className='destBox' flexGrow={1} bgColor='white'>
              <Autocomplete>
                <Input type='text' placeholder='Enter Destination' ref={endRef} />
              </Autocomplete>
            </Box>
  
            <ButtonGroup className='routeBtns'>

              <Button className='searchBtn' type='submit' onClick={search}>
                Search
              </Button>


            </ButtonGroup>

          </HStack>

          <VStack className = "results" spacing={4} mt={4} justifyContent='space-between'>
           
            <Text> Trip Length: {length} </Text>
            <Text> Trip Time: {time} </Text>
            <Button className='clearBtn' aria-label='center back' onClick={resetMap} > Start Over </Button>

          </VStack>

        </Box>

      </Flex>
      
    )
  }
  
  export default PandaMap