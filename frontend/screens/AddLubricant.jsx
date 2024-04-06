

import { Form, Button } from 'react-bootstrap';


import Lsform from "../src/components/Lsform";


const AddLubricant = () => {
    const [name, setName] = useState('');
    const [brand, setBrand] = useState('');
    const [description, setDescription] = useState('');
    const [volume, setVolume] = useState('');

    const [sellingprice, setSellingPrice] = useState('');
    const [purchasedate, setPurchaseDate] = useState('');
    const [cost, setCost] = useState('');


   // const navigate = useNavigate();
   // const dispatch = useDispatch();

    //const [register, { isLoading }] = useRegisterMutation();
    //const { userInfo } = useSelector((state) => state.auth);

    // useEffect(() => {
    //     if (userInfo) {
    //         navigate('/');
    //         toast.success("Registration Successfull");
    //     }
    // }, [navigate, userInfo]);


    //const submitHandler = async (e) => {
     //   e.preventDefault();
        // if (password !== confirmPassword) {
        //     toast.error('Password do not match');
        // }else if (password.length != 5) {
        //     toast.error('Password must contain at least 8 charactors');
        // }
        // else if(phone.length != 10){
        //     toast.error('Enter Valid Phone Number');
        //     }
        // else {
        //     try {
        //         const res = await register({ name, email,phone, password }).unwrap();
        //         dispatch(setCredentials({ ...res }))
        //         navigate('/')
        //     } catch (err) {
        //         toast.error(err?.data?.message || err.err);
        //     }
        // }
    //}

    return (
        <>
            <Lsform >
                <h1>List New Lubricant</h1>
                <Form onSubmit={submitHandler}  >
                    <Form.Group className="my-2" controlId="name">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='text'
                            required='true'
                            placeholder="Enter Lubricant Name "
                            value={name}
                            onChange={(e) => setName(e.target.value)}>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="brand">
                        <Form.Label>Brand</Form.Label>
                        <Form.Control
                            type='text'
                            required='true'
                            placeholder="Enter Brand Name"
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="sellingprice">
                        <Form.Label>Sellingprice</Form.Label>
                        <Form.Control
                            type='number'
                            required='true'
                            placeholder="Enter Selling Price"
                            value={sellingprice}
                            onChange={(e) => setSellingPrice(e.target.value)}>

                        </Form.Control>
                    </Form.Group>

                    <Form.Group className="my-2" controlId="purchasedate">
                        <Form.Label>Purchasedate</Form.Label>
                        <Form.Control
                            required='true'
                            type='date'
                            placeholder="Enter purchasedate"
                            value={purchasedate}
                            onChange={(e) => setPurchasedate(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group className="my-2" controlId="cost">
                        <Form.Label>Cost </Form.Label>
                        <Form.Control
                            type='number'
                            required='true'
                            placeholder="Enter the cost"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group className="my-2" controlId="description">
                        <Form.Label>Description </Form.Label>
                        <Form.Control
                            type='text'
                            required='true'
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}>
                        </Form.Control>
                    </Form.Group>


                    <Form.Group className="my-2" controlId="volume">
                        <Form.Label>Volume </Form.Label>
                        <Form.Control
                            type='text'
                            required='true'
                            placeholder="Enter volume"
                            value={volume}
                            onChange={(e) => setVolume(e.target.value)}>
                        </Form.Control>
                    </Form.Group>
                   {/* // {isLoading && <Loader />} */}

                    <Button type='submit' variant="primary" className="mt-3">
                        Create Account
                    </Button>

                    
                </Form>
            </Lsform>
            <br />
        </>
    )
}

export default AddLubricant

