import { useState } from "react";
import { Box, Container, VStack, Heading, Input, Textarea, Button, FormControl, FormLabel } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [location, setLocation] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newJob = { jobTitle, companyName, location, jobDescription, contactEmail };
    const existingJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    localStorage.setItem("jobs", JSON.stringify([...existingJobs, newJob]));
    navigate("/");
  };

  return (
    <Container maxW="container.md" py="10">
      <Heading mb="6" textAlign="center">Post a Job</Heading>
      <Box as="form" onSubmit={handleSubmit}>
        <VStack spacing={4}>
          <FormControl isRequired>
            <FormLabel>Job Title</FormLabel>
            <Input value={jobTitle} onChange={(e) => setJobTitle(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Company Name</FormLabel>
            <Input value={companyName} onChange={(e) => setCompanyName(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Location</FormLabel>
            <Input value={location} onChange={(e) => setLocation(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Job Description</FormLabel>
            <Textarea value={jobDescription} onChange={(e) => setJobDescription(e.target.value)} />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Contact Email</FormLabel>
            <Input type="email" value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} />
          </FormControl>
          <Button colorScheme="teal" type="submit">Post Job</Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default PostJob;