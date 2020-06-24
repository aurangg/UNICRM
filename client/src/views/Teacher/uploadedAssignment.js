import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import PublishIcon from '@material-ui/icons/Publish';
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
});


const UploadedAssignment = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
        <GridContainer>
        <GridItem  xs={12} sm={12} md={12} lg={12}>
            <div style={{margin:'70px 0px'}}>
                <h3 style={{textAlign:'left', display: 'inline-block'}}>
                    Uploaded Assignments
                </h3>
                <p style={{float:'right'}}>
                    Download All <PublishIcon />
                </p>
            </div>
        </GridItem>
            <GridItem  xs={12} sm={4} md={4} lg={4}>
                <Card className={classes.root}>
                    <CardActionArea>
                        <CardMedia
                        component="img"
                        alt="Contemplative Reptile"
                        height="140"
                        src="https://upload.wikimedia.org/wikipedia/commons/1/1b/Square_200x200.png"
                        title="Contemplative Reptile"
                        />
                        <CardContent>
                        <Typography gutterBottom variant="h5" component="h2">
                            Lizard
                        </Typography>
                        <Typography variant="body2" color="textSecondary" component="p">
                            Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging
                            across all continents except Antarctica
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <Button size="small" color="primary">
                        Share
                        </Button>
                        <Button size="small" color="primary">
                        Learn More
                        </Button>
                    </CardActions>
                </Card>
            </GridItem>
        </GridContainer>
    </React.Fragment>
  );
}

export default UploadedAssignment;