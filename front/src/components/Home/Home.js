import {
  Container,
  Grid,
  Grow,
  Paper,
  AppBar,
  TextField,
  Button,
} from '@material-ui/core';
// import Chip from '@material-ui/core/Chip';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import TagsInput from '../TagInput';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import useStyles from './styles';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import Paginate from '../pagination';

function Home() {
  const classes = useStyles();
  const [currentId, setCurrentId] = useState(null);
  const [search, setSearch] = useState('');
  // const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const history = useHistory();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  /* useEffect(() => {
        dispatch(getPosts());
    }, [dispatch, currentId]); */

  // const addHandler = (tag) => setTags([...tags, tag]);

  // const deleteHandler = (tagToDelete) => setTags(tags.filter(tag => tag !== tagToDelete));

  const selectTagHandler = () => console.log('select tag');

  const searchPostHandler = () => {
    if (search.trim()) {
      // dispatch fetch search post
      dispatch(getPostsBySearch({ search }));
      history.push(`/posts/search?searchQuery=${search || 'none'}`);
    } else {
      history.push('/');
    }
  };

  const keyPressHandler = (e) => {
    if (e.key === 'Enter') {
      searchPostHandler();
    }
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          className={classes.gridContainer}
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onKeyPress={keyPressHandler}
                onChange={(e) => setSearch(e.target.value)}
                style={{ margin: '10px 0' }}
              />
              {/* <TagsInput
                            selectedTags={selectTagHandler}
                            fullWidth
                            variant="outlined"
                            id="tags"
                            name="tags"
                            placeholder="Search Tags"
                            label="tags"
                            style={{margin: '10px 0'}}
                        /> */}
              <Button
                onClick={searchPostHandler}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && (
              <Paper elevation={6} className={classes.pagination}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
}

export default Home;
