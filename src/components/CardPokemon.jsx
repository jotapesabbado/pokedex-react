import { Card } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';

function colorsByType(type) {
  let color = ""
  switch (type) {
    case "fire":
      color = "danger"
      break;
    case "water":
      color = "primary"
      break;
    case "grass":
      color = "success"
      break;
    case "bug":
      color = "warning"
      break;
  }
  console.log(color, type)
  return color
}


const CardPokemon = ({ name, details }) => (
  
  <Card 
    className="text-center" 
    style={{ width: '18rem', marginBottom: '20px' , marginLeft: "5px"}}
    bg={details ? colorsByType(details.types[0].type.name) : ''}
    >
    <Card.Body>
      <Card.Title>{name}</Card.Title>
      <Card.Text>
        {details ? (
          <span>
            <strong>Details:</strong> {details.types.map(type => type.type.name).join(', ')}
            <span>{console.log(details)}</span>
          </span>
        ) : (
          'Loading...'
        )}
      </Card.Text>
      <Card.Text>
        {details ? (
          <Image src={details.sprites.front_default} fluid />
        ) : (
          'Loading...'
        )}
      </Card.Text>
    </Card.Body>
  </Card>
);

export default CardPokemon;
