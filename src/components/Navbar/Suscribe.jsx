import PropTypes from 'prop-types';  
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
} from "@material-tailwind/react";

// El componente DialogCustomAnimation es un diálogo personalizado que acepta dos props:
// - isOpen: un booleano que indica si el diálogo está abierto o cerrado.
// - handler: una función que se llama cuando se quiere cerrar el diálogo.

export function DialogCustomAnimation({ isOpen, handler }) {
    return (
      <Dialog 
        open={isOpen} 
        handler={handler}
        className="bg-transparent shadow-none"
        size="xs"
      >
        <Card className="mx-auto w-full max-w-[24rem]">
          <CardBody className="flex flex-col gap-4">
            <Typography variant="h4" color="blue-gray">
              Subscribe
            </Typography>
            <Typography
              className="mb-3 font-normal"
              variant="paragraph"
              color="gray"
            >
              Subscribe to get whitelist of our app
            </Typography>
            <Typography className="-mb-2" variant="h6">
              Your Email
            </Typography>
            <Input label="Email" size="lg" />
          </CardBody>
          <CardFooter className="pt-0">
            <Button variant="filled" onClick={handler} fullWidth className="bg-blue-500">
              Get Whitelist
            </Button>
          </CardFooter>
        </Card>
      </Dialog>
    );
  }
  
  // Definición de PropTypes para el componente DialogCustomAnimation.
  DialogCustomAnimation.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    handler: PropTypes.func.isRequired,
  };
