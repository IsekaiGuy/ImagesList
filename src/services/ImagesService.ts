import { useHttp } from "../hooks/http.hook";

interface IResult {
    albumId: number,
    id: number,
    thumbnailUrl: string,
    title: string,
    url: string
}

const useImagesService = () => {
    const _apiBase = "https://jsonplaceholder.typicode.com/photos";
    const _basePage = 1;
    const _baseAlbumId = 1;

    const { request, condition, setCondition } = useHttp();

    const getAllPhotos = async (page = _basePage, album = _baseAlbumId) => {
        const result = await request(
            `${_apiBase}?_page=${page}&albumId=${album}`
        );

        return result;
    };

    const getAllAlbumIds = async () => {
        const result = await request(`${_apiBase}`)
            .then(res => new Set(res.map((item: IResult) => item.albumId)))
            .then(res => Array.from(res));

        return result;
    }

    const getAllPages = async (page: number, album: number) => {
        const result = await getAllPhotos(page, album)
            .then(res => res.length);

        return result;
    };

    return {
        getAllPhotos,
        getAllAlbumIds,
        getAllPages,
        condition,
        setCondition,
    };
};

export default useImagesService;