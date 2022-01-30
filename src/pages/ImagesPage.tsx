import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import IdSelector from "../components/IdSelector";
import DeleteButton from "../components/DeleteButton";
import Error from "../components/Error";
import Spinner from "../components/Spinner";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import useImagesService from "../services/ImagesService";

const style = {
    position: 'absolute' as 'absolute',
    top: 0,
    left: 300,
    backgroundColor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 3,
};

interface IImages {
    albumId: number,
    id: number,
    thumbnailUrl: string,
    title: string,
    url: string
}

const ImagesPage = () => {
    const [open, setOpen] = React.useState(false);
    const [images, setImages] = React.useState<IImages[]>([]);
    const [ids, setIds] = React.useState<number[]>([]);
    const [currentAlbumId, setCurrentAlbumId] = React.useState<number>(1);
    const [pages, setPages] = React.useState<number>(0);
    const [currentPage, setCurrentPage] = React.useState<number>(1);
    const [currentImage, setCurrentImage] = React.useState<string>("");

    const handleOpen = (url:string) => {
        setOpen(true);
        setCurrentImage(url);
    }
    const handleClose = () => setOpen(false);

    const { getAllPhotos, getAllAlbumIds, condition, setCondition, getAllPages } = useImagesService();

    const onRequest = (page: number, album: number) => {
        getAllPhotos(page, album)
            .then(onImageListLoaded)
            .then(() => setCondition("confirmed"))
    };

    const onImageListLoaded = (images: IImages[]) => {
        setImages(images);
    };

    const onDelete = (id: number) => {
       const filteredImages = images.filter(image => image.id !== id);
       setImages(filteredImages);
    }

    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
        setCurrentPage(value);
    };

    React.useEffect(() => {
        onRequest(currentPage, currentAlbumId);
        getAllAlbumIds()
            .then((res: any) => setIds(res));
        getAllPages(currentPage, currentAlbumId)
            .then((res: any) => setPages(res));
    }, []);

    React.useEffect(() => {
        onRequest(currentPage, currentAlbumId);
    }, [currentAlbumId, currentPage]);

    const View = () => {
        return (
            <>
                <IdSelector ids={ids} setCurrentAlbumId={setCurrentAlbumId} currentAlbumId={currentAlbumId}/>
                <ImageList sx={{padding: 5, mt: 0}} cols={3} >
                    {images.map((item) => (
                        <ImageListItem key={item.id}>
                            <img
                                src={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.thumbnailUrl}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                                style={{marginBottom: -42, cursor: "pointer"}}
                                onClick={() => handleOpen(item.url)}
                            />
                            <DeleteButton onClick={() => onDelete(item.id)} />
                            <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                sx={{overflowY: "scroll"}}
                            >
                                <Box sx={style}>
                                    <img onClick={handleClose} src={currentImage} alt={item.title} style={{width: "100%", cursor: "pointer"}}/>
                                </Box>
                            </Modal>
                        </ImageListItem>
                    ))}
                </ImageList>
                <Stack spacing={2} sx={{width: "100%", pb: 5}}>
                    <Pagination sx={{margin: "0 auto"}} count={pages} color="secondary" page={currentPage} onChange={handleChange} />
                </Stack>
            </>
        )
    }

    if (condition === "loading") {
        return <Spinner/>
    } else if (condition === "error") {
        return <Error/>
    } else {
        return <View/>
    }
}

export default ImagesPage;