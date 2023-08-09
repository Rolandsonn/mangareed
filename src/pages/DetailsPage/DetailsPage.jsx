import {
  Box,
  Container,
  CircularProgress,
  Typography,
  Button,
  Pagination,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getComments,
  getManga,
  postComm,
} from "../../redux/slices/MangasSlice";
import CommentModal from "../../components/screens/AddCommentModal/CommentModal";
import { useDispatch, useSelector } from "react-redux";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { NavLink } from "react-router-dom";
import { getGenres } from "../../redux/slices/GenresSlice";
import Comment from "../../components/screens/Comment";
import { CustomPagination } from "../../components/screens/Pagination/CustomPagination";

const DetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { manga, isLoading, comments } = useSelector((state) => state.mangas);
  const { genres } = useSelector((state) => state.genres);
  const [open, setOpen] = useState(false);
  const [offset, setOffset] = useState(0);
  const [modalStyle, setModalStyle] = useState("none");

  useEffect(() => {
    dispatch(getManga(id));
  }, [dispatch, id]);

  const postReq = (data) => dispatch(postComm(data));
  const substr = (str) => str.substring(3, str?.length - 4);

  const openModal = () => {
    setOpen(true);
    setModalStyle("block");
  };

  const closeModal = () => {
    setOpen(false);
    setModalStyle("none");
  };

  const changeOffset = (p) => setOffset(p);
  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getComments(id));
  }, []);

  return (
    <>
      <Box sx={{ background: "#F3F3F3", paddingTop: "87px" }}>
        {!isLoading ? (
          <Container
            sx={{ "&.MuiContainer-root": { padding: 0, maxWidth: 1240 } }}
          >
            <NavLink to="/">
              <Box
                sx={{
                  paddingTop: "33px",
                  display: "flex",
                  alignItems: "center",
                  columnGap: "14px",
                  color: "#878787",
                }}
              >
                <ArrowBackIcon />
                <Typography paragraph sx={{ fontSize: "24px", margin: 0 }}>
                  Назад
                </Typography>
              </Box>
            </NavLink>
            <Box
              sx={{
                paddingTop: "32px",
                display: "flex",
                columnGap: "41px",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${manga?.image})`,
                  width: "328px",
                  height: "328px",
                  borderRadius: "16px",
                  backgroundSize: "cover",
                  backgroundRepeat: "no-repeat",
                }}
              ></Box>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "20px",
                }}
              >
                <Typography variant="h2" sx={{ fontSize: "40px" }}>
                  {manga?.ru_name}
                </Typography>
                <Typography sx={{ paddingTop: "21px" }} variant="p">
                  Информация:
                </Typography>
                <Typography variant="p">
                  Тип:
                  <Typography
                    sx={{
                      color: "#878787",
                      fontSize: "24px",
                      marginLeft: "10px",
                    }}
                    variant="span"
                  >
                    {manga?.type}
                  </Typography>
                </Typography>
                <Typography variant="p">
                  Год:
                  <Typography
                    sx={{
                      color: "#878787",
                      fontSize: "24px",
                      marginLeft: "10px",
                    }}
                    variant="span"
                  >
                    {manga?.issue_year}
                  </Typography>
                </Typography>
                <Typography sx={{ display: "flex" }} variant="p">
                  Жанр:
                  <Box
                    sx={{ width: "785px", display: "flex", flexWrap: "wrap" }}
                  >
                    {manga?.genre?.map((item) => (
                      <Typography
                        sx={{
                          color: "#878787",
                          fontSize: "24px",
                          marginLeft: "10px",
                        }}
                        variant="span"
                        key={item}
                      >
                        {`${genres[item]?.title},`}
                      </Typography>
                    ))}
                  </Box>
                </Typography>
              </Box>
            </Box>
            <Box
              sx={{
                borderBottom: "3px solid #CECECE",
                borderTop: "3px solid #CECECE",
                margin: "20px 0",
                padding: "20px 0",
              }}
            >
              <Typography variant="h3">Синопсис</Typography>
              <Typography
                sx={{
                  color: "#616161",
                  margin: "10px 0 0 0",
                  fontSize: "24px",
                }}
                paragraph
              >
                {manga?.description && substr(manga?.description)}
              </Typography>
            </Box>
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="h3">Топ рецензий</Typography>
                <Button onClick={openModal}>
                  <Typography
                    variant="h3"
                    sx={{ color: "#AD02E0", fontSize: "18px" }}
                  >
                    Добавить комментарий
                  </Typography>
                </Button>
                <CommentModal
                  postReq={postReq}
                  open={open}
                  closeModal={closeModal}
                  modalStyle={modalStyle}
                />
              </Box>
              <Box
                sx={{
                  marginTop: "33px",
                  display: "flex",
                  flexDirection: "column",
                  rowGap: "33px",
                }}
              >
                {comments.length > 0 ? (
                  comments
                    .slice(offset * 3 - 3, offset * 3)
                    .map((user) => <Comment key={user.id} user={user} />)
                ) : (
                  <Typography variant="h4">
                    Здесь пока нет комментариев
                  </Typography>
                )}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "column",
                  rowGap: "33px",
                }}
              >
                <Pagination
                  sx={{
                    "& button.Mui-selected ": { color: "#fff" },
                    "& button": { color: "#A5A5A5" },
                    margin: "38px 0 37px 0",
                  }}
                  color="secondary"
                  size="large"
                  onChange={(_, p) => changeOffset(p)}
                  count={Math.ceil(manga?.comments_count / 3)}
                />
              </Box>
            </Box>
          </Container>
        ) : (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "500px",
            }}
          >
            <CircularProgress />
          </Box>
        )}
      </Box>
    </>
  );
};

export default DetailsPage;
