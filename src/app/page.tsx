import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

export default function Home() {
  return (
    <Container className='app-content'>
      <Typography variant="h1">Next.js Auth0 Example</Typography>
      <Typography variant="h2" sx={{ color: '#434343' }}>A project created as a proof of concept for Next.js Auth0 integration</Typography>
    </Container>
  );
}
