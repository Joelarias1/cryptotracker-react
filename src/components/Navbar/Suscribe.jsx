import PropTypes from "prop-types";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  CardHeader,
} from "@material-tailwind/react";

import { VscGithub } from "react-icons/vsc";
import { motion } from "framer-motion";

// El componente DialogCustomAnimation es un diálogo personalizado que acepta dos props:
// - isOpen: un booleano que indica si el diálogo está abierto o cerrado.
// - handler: una función que se llama cuando se quiere cerrar el diálogo.

export function DialogCustomAnimation({ isOpen, handler }) {
  const socialAnimation = {
    scale: 1.1,
    transition: { duration: 0.2 },
  };
  return (
    <Dialog
      open={isOpen}
      handler={handler}
      className="bg-transparent shadow-none"
      size="xs"
    >
      <Card className="mx-auto w-full max-w-[24rem]">
        <CardHeader floated={false} className="h-full">
          <img
            src="https://happyvalentinesday2020.online/pics/cdn.dribbble.com/users/6616/screenshots/1458875/rocket.gif"
            alt="rocket-picture"
            className="object-cover"
          />
        </CardHeader>
        <CardBody className="flex flex-col gap-4">
          <Typography variant="h4" color="blue-gray">
            Stay Tuned
          </Typography>
          <Typography
            className="mb-3 font-normal"
            variant="paragraph"
            color="gray"
          >
            Subscribe to get whitelist of our app. <br />
            See our proyect on Github
          </Typography>
          <Typography className="-mb-2" variant="h6">
            Your Email
          </Typography>
          <Input label="Email" size="lg" />
        </CardBody>
        <CardFooter className="pt-0">
          <Button
            variant="filled"
            onClick={handler}
            fullWidth
            className="bg-blue-500"
          >
            Get Whitelist
          </Button>
          <div className="flex justify-center gap-4 pt-2">
            <motion.a
              href="https://github.com/Joelarias1/cryptotracker-react"
              className="inline-flex items-center justify-center p-3 border border-white rounded-full transition duration-300"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={socialAnimation}
            >
              <VscGithub className="text-gray-700 text-4xl font-bold" />
            </motion.a>
          </div>
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
