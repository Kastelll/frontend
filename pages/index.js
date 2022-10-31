import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    Input,
    Stack,
    Text,
    useColorMode,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import {MoonIcon, SunIcon} from "@chakra-ui/icons";
import csrf from "../utils/csrf";
import fetchJson from "../utils/fetchJson";

function HomePage({csrfToken}) {
    const {colorMode, toggleColorMode} = useColorMode();
    const toast = useToast();

    const subscribe = async event => {
        event.preventDefault();

        // send request to api
        let email = event.target.email.value;

        let subscribe = await fetchJson('/api/subscribe', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'CSRF-Token': csrfToken || null
            },
            body: JSON.stringify({
                email: email,
            })
        })

        if (!subscribe.error) {
            toast({
                title: 'Sign up successful.',
                description: `Thank you for signing up!`,
                status: 'success',
                duration: 9000,
                isClosable: true,
            })
        } else {
            if (subscribe.response === 'Conflict') {
                toast({
                    title: 'Signup Error',
                    description: `You are already subscribed.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            } else {
                toast({
                    title: 'API Error',
                    description: `Error Occurred, please try again later.`,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                })
            }
        }

    }

    return (
        <>

            <Button
                onClick={() => toggleColorMode()}
                pos="absolute"
                top="0"
                right="0"
                m="1rem"
            >
                {colorMode === "dark" ? (
                    <SunIcon color="orange.200"/>
                ) : (
                    <MoonIcon color="blue.700"/>
                )}
            </Button>

            <Container maxW={'3xl'}>
                <Stack
                    as={Box}
                    textAlign={'center'}
                    spacing={{base: 8, md: 14}}
                    py={{base: 20, md: 36}}>
                    <Heading
                        fontWeight={600}
                        fontSize={{base: '2xl', sm: '4xl', md: '6xl'}}
                        lineHeight={'110%'}>
                        Welcome to Kastel <br/>
                        <Text as={'span'} color={'purple.300'}>
                            We are a Chatting App like Discord & Guilded.
                        </Text>
                    </Heading>
                    <Text color={'gray.500'}>
                        We are Open Sourced so the Community can help and learn. We also Encrypt all User Data so that
                        no one is able to view your data and that is for all data.
                    </Text>
                    <Stack
                        direction={'column'}
                        spacing={3}
                        align={'center'}
                        alignSelf={'center'}
                        position={'relative'}>

                        <Stack
                            direction={{base: 'column', md: 'row'}}
                            as={'form'}
                            spacing={'12px'}
                            onSubmit={subscribe}>
                            <FormControl>
                                <Input
                                    variant={'solid'}
                                    borderWidth={1}
                                    color={useColorModeValue('gray.300', 'gray.200')}
                                    _placeholder={{
                                        color: useColorModeValue('gray.500', 'gray.100'),
                                    }}
                                    borderColor={useColorModeValue('gray.300', 'purple.800')}
                                    id={'email'}
                                    type={'email'}
                                    required
                                    placeholder={'Your Email'}
                                    aria-label={'Your Email'}
                                />
                            </FormControl>
                            <FormControl w={{base: '100%', md: '40%'}}>
                                <Button
                                    bg={'purple.500'}
                                    _hover={{
                                        bg: 'purple.400',
                                    }}
                                    _dark={{
                                        color: 'gray.100',
                                    }}
                                    w="100%"
                                    type={'submit'}>
                                    Submit
                                </Button>
                            </FormControl>
                        </Stack>

                        <Button variant={'link'} colorScheme={'purple'} size={'sm'}>
                            Want to join our newsletter?
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </>
    )
}

export default HomePage;

export const getServerSideProps = async function ({req, res}) {

    await csrf(req, res);

    return {
        props: {
            csrfToken: req.csrfToken()
        },
    };
}