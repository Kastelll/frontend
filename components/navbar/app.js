import React from 'react';
import {
    Avatar,
    Box,
    CloseButton,
    Divider,
    Drawer,
    DrawerContent,
    Flex,
    HStack,
    Icon,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Popover,
    PopoverBody,
    PopoverContent,
    PopoverTrigger,
    Stack,
    Text,
    Tooltip,
    useColorModeValue,
    useDisclosure,
    VStack,
} from '@chakra-ui/react';
import {FiBell, FiChevronDown, FiHome, FiMenu} from 'react-icons/fi';
import NextLink from 'next/link'
import NewServer from "../app/new-server";

const LinkItems = [
    {name: 'Home', icon: FiHome, url: '/app/@me'},
];

export default function AppNav({user, guilds, children}) {
    const {isOpen, onOpen, onClose} = useDisclosure();

    let userInfo = JSON.parse(user);

    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                userInfo={userInfo}
                onClose={() => onClose}
                display={{base: 'none', md: 'block'}}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full">
                <DrawerContent>
                    <SidebarContent userInfo={userInfo} onClose={onClose}/>
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav userInfo={userInfo} onOpen={onOpen}/>
            <Box ml={{base: 0, md: 60}} p="4">
                {children}
            </Box>
        </Box>
    );
}

const SidebarContent = ({userInfo, onClose, ...rest}) => {
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{base: 'full', md: '10%'}}
            pos="fixed"
            h="full"
            {...rest}>
            <Flex h="20" alignItems="center" mx="5" justifyContent="space-between">
                <Text fontSize="2xl" fontFamily="monospace" fontWeight="bold">
                    Kastel
                </Text>
                <CloseButton display={{base: 'flex', md: 'none'}} onClick={onClose}/>
            </Flex>

            {/*
            temp removal
            {LinkItems.map((link) => (
                <NextLink href={link.url} key={link.name}>
                    <NavItem key={link.name} icon={link.icon}>
                        {link.name}
                    </NavItem>
                </NextLink>
            ))}*/}

            <Divider/>
            {/* Guild Listing */}


            <Stack h="20" mt={5} alignItems="center" mx="8" justifyContent="space-between">

                <Tooltip color={useColorModeValue('gray.800', 'white')} bg={useColorModeValue('white', 'gray.700')}
                         hasArrow label='Test server' placement='right'>
                    <Box marginBottom={2}>
                        <Image borderRadius='full'
                               alt={'testing guild'}
                               boxSize='40px' src={'/icon-2.png'}/>
                    </Box>
                </Tooltip>

                <Tooltip hasArrow label='Create new guild' placement='right'>
                    <NewServer userInfo={userInfo}/>
                </Tooltip>
            </Stack>

        </Box>
    );
};

const NavItem = ({url, icon, children, ...rest}) => {
    return (
        <Link href={url} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}>
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

const MobileNav = ({userInfo, onOpen, ...rest}) => {
    const initialFocusRef = React.useRef()
    return (
        <Flex
            ml={{base: 0, md: 30}}
            px={{base: 4, md: 4}}
            height="20"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{base: 'space-between', md: 'flex-end'}}
            {...rest}>
            <IconButton
                display={{base: 'flex', md: 'none'}}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu/>}
            />

            <Text
                display={{base: 'flex', md: 'none'}}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold">
                Kastel
            </Text>

            <HStack spacing={{base: '0', md: '6'}}>

                <Popover>

                    <PopoverTrigger>
                        <IconButton
                            size="lg"
                            variant="ghost"
                            aria-label="open menu"
                            icon={<FiBell/>}
                        />

                    </PopoverTrigger>


                    <PopoverContent color='white' bg='blue.800' borderColor='blue.800'>
                        {/* notification listing */}
                        <PopoverBody>
                            No New Notifications
                        </PopoverBody>
                    </PopoverContent>

                </Popover>
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{boxShadow: 'none'}}>
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={'/icon-1.png'}
                                />
                                <VStack
                                    display={{base: 'none', md: 'flex'}}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2">
                                    <Text fontSize="sm">{userInfo?.username || "Loading"}</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Online
                                    </Text>
                                </VStack>
                                <Box display={{base: 'none', md: 'flex'}}>
                                    <FiChevronDown/>
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList>
                            <MenuItemLink href={'/app/@me'}>Profile</MenuItemLink>
                            <MenuItemLink href={'/app/@me/settings'}>Settings</MenuItemLink>
                            <MenuDivider/>
                            <MenuItemLink href={'/app/logout'}>Sign out</MenuItemLink>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};

const MenuItemLink = ({href, icon, children, ...rest}) => {
    return (
        <Link as={NextLink} href={href} style={{textDecoration: 'none'}} _focus={{boxShadow: 'none'}}>
            <MenuItem>{children}</MenuItem>
        </Link>
    );
};