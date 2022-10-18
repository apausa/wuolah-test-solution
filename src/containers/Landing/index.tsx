import { Button, Center, Container, Heading } from "@chakra-ui/react";
import Link from "next/link";

export const Landing = () => {
  return (
    <Center flexDir="column" w="full" h="full">
      <Heading>Wuolah</Heading>
      <Link href="/universidades">
        <Button variant="link">Universidades</Button>
      </Link>
    </Center>
  );
};
