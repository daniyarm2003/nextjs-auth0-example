import Navbar from "@/components/navbar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Container className='app-content'>
        <Typography variant="h1">Next.js Auth0 Example</Typography>
        <Typography variant="h2">A project created as a proof of concept for Next.js Auth0 integration</Typography>
      </Container>
    </div>
  );
}
