import Head from 'next/head'
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {useState} from "react";

interface IResult {
    model_accuracy: number,
    predict: number,
    predict_accuracy: number
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

    const [age, setAge] = useState<string>();
    const [sex, setSex] = useState<string>();
    const [cp, setCp] = useState<string>();
    const [thalachh, setThalachh] = useState<string>();
    const [exng, setExng] = useState<string>();
    const [oldpeak, setOldpeak] = useState<string>();
    const [slp, setSlp] = useState<string>();
    const [caa, setCaa] = useState<string>();
    const [thall, setThall] = useState<string>();

    const [results, setResults] = useState<IResult>();

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
            "thall": parseInt(thall!)
        };

        fetch("http://157.245.64.45:5000/predict", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload),
        }).then((res) => res.json())
            .then((data) => setResults(data));
    };

    return (
    <Container maxWidth="sm">
      <Head>
        <title>Hear attack prediction</title>
        <meta name="description" content="Heart attack application" />
          <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests"/>
          <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
          <h1>Heart attack prediction</h1>
          { !results ? (
              <Box
                  component="form"
                  sx={{
                      '& .MuiTextField-root': { m: 1, width: '25ch' },
                  }}
                  noValidate
                  autoComplete="off"
                  onSubmit={handleSubmit}
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
                          label="Slp"
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
                          label="Caa"
                          type="number"
                          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                          value={caa}
                          onChange={handleCaaChange}
                      />
                      <TextField
                          id="outlined-required"
                          label="Thall"
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
                  </div>
                  <Button type="submit" variant="contained" fullWidth={true}>Submit</Button>
              </Box>
          ): (
              <Stack
                  direction="row"
                  justifyContent="center"
                  alignItems="center"
                  spacing={2}
              >
                  <p>
                      {results.predict > 0 ? 'I\'m sorry to tell you, but you\'re at risk for a heart attack.  Please see a doctor if you have any complaints. Get well soon!'
                      : 'Congratulations! You passed the rapid heart attack test. You are out of the risk zone for a heart attack. Stay healthy as you!' }
                  </p>
              </Stack>
          )}
      </main>


    </Container>
  )
}
