import dayjs from "dayjs";

const transform = (date: number) => {
    return dayjs(date).format("YYYY-MM-DD HH:mm:ss");
}

export default {
    transform
}