import Head from 'next/head'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useState, useRef} from "react";

interface IResult {
    model_accuracy: number | null,
    predict: number | null,
    predict_accuracy: number | null
}

export default function Home() {
    const genders = [
        {
            value: 1,
            label: 'Male',
        },
        {
            value: 0,
            label: 'Female',
        }
    ];
    const pains = [
        {
            value: 0,
            label: 'Typical angina',
        },
        {
            value: 1,
            label: 'Atypical angina',
        },
        {
            value: 2,
            label: 'Non-anginal pain',
        },
        {
            value: 3,
            label: 'Asymtptomatic',
        }
    ];
    const answers = [
        {
            value: 0,
            label: 'No'
        },
        {
            value: 1,
            label: 'Yes'
        }
    ];
    const slopes = [
        {
            value: 0,
            label: 'Unslopping'
        },
        {
            value: 1,
            label: 'Flat'
        },
        {
            value: 2,
            label: 'Downslopping'
        }
    ];
    const levelsHemoglobin = [
        {
            value: 0,
            label: 'I don\'t know'
        },
        {
            value: 1,
            label: 'Problem with heart'
        },
        {
            value: 2,
            label: 'No'
        },
        {
            value: 3,
            label: 'No normal blood flow'
        },
    ];

    const fbsList = [
        {
            value: 0,
            label: 'Less than 120 mg/d'
        },
        {
            value: 1,
            label: 'More than 120 mg/d'
        }
    ];

    const restecgList = [
        {
            value: 0,
            label: 'Normal'
        },
        {
            value: 1,
            label: 'ST-T wave abnormality'
        },
        {
            value: 2,
            label: 'Left ventricular hypertrophy by Estes\' criteria'
        }
    ];

    const countries = [
        {
            value: 0,
            label: 'No'
        },
        {
            value: 1,
            label: 'Yes'
        },
    ];

    const [age, setAge] = useState<string>();
    const [sex, setSex] = useState<string>();
    const [cp, setCp] = useState<string>();
    const [thalachh, setThalachh] = useState<string>();
    const [exng, setExng] = useState<string>();
    const [oldpeak, setOldpeak] = useState<string>();
    const [slp, setSlp] = useState<string>();
    const [caa, setCaa] = useState<string>();
    const [thall, setThall] = useState<string>();
    const [fbs, setFbs] = useState<string>();
    const [restecg, setRestecg] = useState<string>();
    const [chol, setChol] = useState<string>();
    const [trtbps, setTrtbps] = useState<string>();
    const [country, setCountry] = useState<string>();

    const formRef = useRef(null);

    const [results, setResults] = useState<IResult>({
        predict_accuracy: null,
        predict: null,
        model_accuracy: null
    });

    // @ts-ignore
    const handleAgeChange = (event) => setAge(event.target.value);
    // @ts-ignore
    const handleSexChange = (event) => setSex(event.target.value);
    // @ts-ignore
    const handleCpChange = (event) => setCp(event.target.value);
    // @ts-ignore
    const handleThalachhChange = (event) => setThalachh(event.target.value);
    // @ts-ignore
    const handleExngChange = (event) => setExng(event.target.value);
    // @ts-ignore
    const handleOldpeakChange = (event) => setOldpeak(event.target.value);
    // @ts-ignore
    const handleSlpChange = (event) => setSlp(event.target.value);
    // @ts-ignore
    const handleCaaChange = (event) => setCaa(event.target.value);
    // @ts-ignore
    const handleThallChange = (event) => setThall(event.target.value);
    // @ts-ignore
    const handleFbsChange = (event) => setFbs(event.target.value);
    // @ts-ignore
    const handleRestecgChange = (event) => setRestecg(event.target.value);
    // @ts-ignore
    const handleCholChange = (event) => setChol(event.target.value);
    // @ts-ignore
    const handleTrtbpsChange = (event) => setTrtbps(event.target.value);
    // @ts-ignore
    const handleCountryChange = (event) => setCountry(event.target.value);
    // @ts-ignore
    const handleSubmit = (event) => {
        event.preventDefault();
        const payload = {
            "age": parseInt(age!),
            "sex": parseInt(sex!),
            "cp": parseInt(cp!),
            "thalachh": parseInt(thalachh!),
            "exng": parseInt(exng!),
            "oldpeak": parseFloat(oldpeak!),
            "slp": parseInt(slp!),
            "caa": parseInt(caa!),
            "thall": parseInt(thall!),
            "fbs": parseInt(fbs!),
            "restecg": parseInt(restecg!),
            "chol":parseInt(chol!),
            "trtbps":parseInt(trtbps!),
            "country":parseInt(country!)
        };

        fetch("https://3s-shop.ru/predict", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then((res) => res.json())
            .then((data) => setResults(data));
        // @ts-ignore
        // formRef.current.reset();
        // setAge('');
        // setCaa('');
        // setSlp('');
        // setExng('');
        // setSex('');
        // setThalachh('');
        // setThall('');
        // setOldpeak('');
        // setCp('')
    };

    return (
    <Container maxWidth="sm">
      <Head>
        <title>Hear attack prediction</title>
        <meta name="description" content="Heart attack application" />
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <h1>Heart attack prediction 💔 🏥</h1>
              <Box
                  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
                  ref={formRef}
              >
                  <div>
                      <TextField
                          id="outlined-required"
                          label="Age"
                          type="number"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={age}
                          onChange={handleAgeChange}
                      />
                      <TextField
                          id="outlined-selected"
                          label="Gender"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleSexChange}
                      >
                          <option>Select</option>
                          {genders.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-required"
                          label="Chest pain"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleCpChange}
                      >
                          <option>Select</option>
                          {pains.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-required"
                          label="Maximum heart rate - (220 - age)"
                          type="number"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={thalachh}
                          onChange={handleThalachhChange}
                      />
                      <TextField
                          id="outlined-required"
                          label="Your angina is result of exercise"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleExngChange}
                      >
                          <option>Select</option>
                          {answers.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-required"
                          label="ST depression"
                          type="number"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={oldpeak}
                          onChange={handleOldpeakChange}
                      />
                      <TextField
                          id="outlined-required"
                          label="Slope of ST segment"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleSlpChange}
                      >
                          <option>Select</option>
                          {slopes.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-required"
                          label="Number of major vessels"
                          type="number"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={caa}
                          onChange={handleCaaChange}
                      />
                      <TextField
                          id="outlined-required"
                          label="Low level of hemoglobin"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleThallChange}
                      >
                          <option>Select</option>
                          {levelsHemoglobin.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-selected"
                          label="Fasting blood sugar"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleFbsChange}
                      >
                          <option>Select</option>
                          {fbsList.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-selected"
                          label="Resting electrocardiographic results"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleRestecgChange}
                      >
                          <option>Select</option>
                          {restecgList.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                      <TextField
                          id="outlined-required"
                          label="Cholesterol in mg/dl fetched via BMI sensor"
                          type="number"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={chol}
                          onChange={handleCholChange}
                      />
                      <TextField
                        id="outlined-required"
                        label="Resting blood pressure (in mm Hg)"
                        type="number"
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                        value={trtbps}
                        onChange={handleTrtbpsChange}
                        />
                      <TextField
                          id="outlined-selected"
                          label="Do you live in a developed country?"
                          select
                          SelectProps={{
                              native: true,
                          }}
                          onChange={handleCountryChange}
                      >
                          <option>Select</option>
                          {countries.map((option) => (
                              <option key={option.value} value={option.value}>
                                  {option.label}
                              </option>
                          ))}
                      </TextField>
                  </div>
                  <Button type="submit" variant="contained" fullWidth={true}>Predict</Button>
              </Box>
              <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="start"
                  spacing={1}
              >
                  <p>
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>Result:</span>
                      {results.predict === 0 || results.predict === 1 ? (
                          <span>
                          {results.predict !== 0 ? 'I\'m sorry to tell you, but you\'re at risk for a heart attack.  Please see a doctor if you have any complaints. Get well soon!'
                              : 'Congratulations! You passed the rapid heart attack test. You are out of the risk zone for a heart attack. Stay healthy as you!' }
                      </span>
                      ): (
                          <span></span>
                      )}

                  </p>
                  <p>
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>Prediction accuracy:</span> { results.predict_accuracy}
                  </p>
                  <p>
                      <span style={{fontWeight: 'bold', fontSize: '18px'}}>Overall model accuracy:</span> { results.model_accuracy}
                  </p>
              </Stack>
      </main>


    </Container>
  )
}
