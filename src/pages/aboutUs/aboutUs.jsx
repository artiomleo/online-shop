import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ContactUs from './contact';
import './aboutUs.css'


const styles = theme => ({
  root: {
    flexGrow: 1,
    paddingTop:"50px",
    
  },
  Card: {

    color: theme.palette.text.secondary,
  },
  aboutUs: {

    marginTop: "20px",
  },
  contactCopmonent: {
    position: "absolute",
    marginLeft: "-60px",
    marginTop: "30px",
    maxWidth: "500px",
  },
  title: {
    fontSize: "3rem"
  },
  text: {
    fontSize: "15px",
    textDecorationLine: "underline"
  },
  list: {
    fontStyle: "italic",
    fontSize: "19px"
  },
  description: {
    fontSize: "15px"
  },
  property: {
    fontSize: "15px",
    textIndent: "40px"

  }


});

class AboutPage extends React.Component {

  state = {

  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container spacing={24} >
          <Grid item xs >

          </Grid>
          <Grid item xs={5} >
            <Card className={classes.Card + " aboutUsCard"}>
              <Typography  color = "primary" variant="h4" className={classes.title}>
                Despre Noi
                </Typography>
              <Typography className={classes.aboutUs} component="p">
                <strong className={classes.text}>  De peste 20 de ani, filozofia companiei noastre s-a concentrat asupra unui singur concept : <br/></strong>
                <ol className={classes.list}>
                  <ul>Igiena</ul>
                </ol>
                <div className={classes.description}>
    Lumea noastra se schimba, planeta devine mai mica, granitele cad.
    Oamenii calatoresc liber dintr-o tara in alta iar microorganismele apar tot mai frecvent ca pasageri invizibili intr-o lume globalizata.
    Riscurile asociate acestui fenomen sunt adesea subestimate.
    Produsele pe care le oferim protejeaza atat oamenii cat si materialele impotriva infectiilor si contaminarii. In acest proces am invatat ca prevenirea infectiilor este considerabil mai usoara decat combaterea lor.
    Imbunatatiti procesele.
    </div> <br/>
    <ol className={classes.list}>
      <ul>Reduceti Costurile</ul>
    </ol>
    <div className={classes.description}>
    Asteptarile in domeniul medical sunt mereu avansate dar azi mai mult decat oricand se pune accent pe obtinerea celor mai bune rezultate cu o cat mai eficienta utilizare a resurselor. Aceasta provocare cere solutii eficace si flexibile.
    Va propunem aceste solutii sub forma unui portofoliu de produse armonizat, cu numeroase domenii de utilizare, ce asigura produsul optim pentru diferitele provocari ale unei piete in continua schimbare.
    Pentru asigurarea calitatii, preventia, identificarea si combaterea infectiilor ramane factorul decisiv.
    Credem in puterea parteneriatului pentru a obtine cel mai bun rezultat. Dorim sa fim partenerii dvs. in atingerea si mentinerea celor mai inalte standarde de igiena.<br/>
    </div>
    <div className={classes.property}>
    <strong>Firma Intercoop </strong>, in calitate de distribuitor de produse medicale, unic reprezentant autorizat in Romania al firmei SCHULKE Germania, pentru a deveni o organizaţie puternica, bine structurata si competitiva, eficace si eficienta si pentru a demonstra clientului capabilitatea de a-i satisface toate cerinţele si a-i furniza in mod consecvent produsele solicitate, se angajeaza sa dezvolte si sa imbunatateasca continuu un sistem de management al calitatii in conformitate cu cerintele standardului international ISO 9001:2008 si a obiectului de activitate al organizatiei noastre.<br/>
    </div>
    <div className={classes.property}>
    Zilnic intampinam noi provocari, iar trecerea acestora fara rabat de la calitate duce la realizarea unui produs final la nivelul asteptarilor clientilor, precum si la satisfactie si respect de sine pentru cei care au contribuit la realizarea acestuia.
    Pe aceasta cale, societatea se angajeaza sa sati noi provocari, iar trecerea acestora fara rabat de la calitate duce la realizarea unui produs final la nivelul asteptarilor clientilor, precum si la satisfactie si respect de sine pentru cei care au contribuit la realizarea acestuia.<br/>
    Pe aceasta cale, societatea se angajeaza sa satisfaca cu promptitudine, responsabilitate si profesionalism cerintele specificate si asteptarile clientilor nostri, la nivelul cerintelor de armonizare legislativa si de standardizare impuse de integrarea economica europeana.
    </div>
                  </Typography>
              </Card> 
          </Grid>
          <Grid item xs={3} >
            <div className={classes.contactCopmonent}>
              <Card className={classes.Card + " aboutUsCard"}>

              <ContactUs>
                </ContactUs>
              </Card>
            </div>
          </Grid>
          <Grid item xs >

          </Grid>
        </Grid>
        <footer className={classes.footer + " footer"}>
          <Typography component="h4" variant="h4" color="primary">
            Contact:
            <br />
            <br />

          </Typography>
          <Typography
            component="p"
            variant="inherit"
            color="primary"
            style={{ color: "white", display: "inline-block" }}
          >
            S.C. INTERCOOP S.R.L
            <br />
            Sediu:
            <br />
            Loc. Ernei - 547215, Jud.Mures
            <br />
            Str. Principala nr. 376
            <br />
            <br />
            <br />
            J26/1502/1993
            <br />
            RO4275950
          </Typography>
          <Typography
            component="p"
            variant="inherit"
            color="primary"
            style={{
              color: "white",
              display: "inline-block",
              marginLeft: "30px"
            }}
          >
            Tel/Fax: +40 265 267 708 <br />
            +40 265 265 569 <br />
            mail: office@intercoop.ro <br />
            www.intercoop.ro <br />
            www.arcana-hygiene.com
          </Typography>
          <br />
          <p style={{ color: "white", textAlign: "center" }}>
            Copyright © 2019 Intercoop
          </p>
        </footer>
      </div>
    )
  };
};

AboutPage.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(AboutPage);
