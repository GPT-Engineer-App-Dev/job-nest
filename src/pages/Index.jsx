import { Box, Container, VStack, Text, Input, Button, HStack, Flex, Heading, Spacer, Link, SimpleGrid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Textarea } from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa";
import { useEffect, useState } from "react";

const Index = () => {
  const [jobs, setJobs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicantName, setApplicantName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [resume, setResume] = useState(null);
  const [coverLetter, setCoverLetter] = useState("");

  useEffect(() => {
    const storedJobs = JSON.parse(localStorage.getItem("jobs")) || [];
    setJobs(storedJobs);
  }, []);

  const openModal = (job) => {
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newApplication = { applicantName, email, phoneNumber, resume, coverLetter, jobId: selectedJob.id };
    const existingApplications = JSON.parse(localStorage.getItem("applications")) || [];
    localStorage.setItem("applications", JSON.stringify([...existingApplications, newApplication]));
    closeModal();
  };

  return (
    <Box>
      {/* Navigation Bar */}
      <Flex as="nav" bg="blue.600" color="white" padding="1.5rem" alignItems="center">
        <Heading size="md">JobFinder</Heading>
        <Spacer />
        <HStack spacing="24px">
          <Link href="#">Home</Link>
          <Link href="#">Jobs</Link>
          <Link href="/post-job">Post a Job</Link> {/* Add link to post a job */}
          <Link href="#">About Us</Link>
          <Link href="#">Contact</Link>
        </HStack>
      </Flex>

      {/* Hero Section */}
      <Box bg="blue.500" color="white" py="10rem" textAlign="center">
        <Heading mb="4">Find Your Dream Job</Heading>
        <Input placeholder="Search for jobs..." size="lg" width="50%" mx="auto" mb="4" />
        <Button colorScheme="teal" size="lg">Search</Button>
      </Box>

      {/* Job Listings Section */}
      <Container maxW="container.lg" py="10">
        <Heading mb="6" textAlign="center">Job Listings</Heading>
        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={10}>
          {jobs.map((job, index) => (
            <GridItem key={index}>
              <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
                <Heading size="md">{job.jobTitle}</Heading>
                <Text mt="2">Company: {job.companyName}</Text>
                <Text>Location: {job.location}</Text>
                <Text mt="4">{job.jobDescription}</Text>
                <Text mt="4">Contact: {job.contactEmail}</Text>
                <Button colorScheme="teal" mt="4" onClick={() => openModal(job)}>Apply</Button>
              </Box>
            </GridItem>
          ))}
        </SimpleGrid>
      </Container>

      {/* Modal for Job Application */}
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Apply for {selectedJob?.jobTitle}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Applicant Name</FormLabel>
                <Input value={applicantName} onChange={(e) => setApplicantName(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Email</FormLabel>
                <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Phone Number</FormLabel>
                <Input value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Resume</FormLabel>
                <Input type="file" onChange={(e) => setResume(e.target.files[0])} />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Cover Letter</FormLabel>
                <Textarea value={coverLetter} onChange={(e) => setCoverLetter(e.target.value)} />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleSubmit}>Submit Application</Button>
            <Button variant="ghost" onClick={closeModal}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Footer */}
      <Box bg="gray.800" color="white" py="6">
        <Container maxW="container.lg">
          <Flex justify="space-between" align="center">
            <Text>&copy; 2023 JobFinder. All rights reserved.</Text>
            <HStack spacing="24px">
              <Link href="#"><FaFacebook /></Link>
              <Link href="#"><FaTwitter /></Link>
              <Link href="#"><FaLinkedin /></Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
};

export default Index;