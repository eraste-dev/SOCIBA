import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { IUserRequest } from "app/reducer/userRequest/userRequest";
import { ITestimonial } from "app/reducer/testimonials/testimonial";
import Avatar from "components/Avatar/Avatar";

export interface SingleTestimonialDetailProps {
    handleClose: () => void;
    open: boolean;
    row: ITestimonial;
}

const SingleTestimonialDetail: FC<SingleTestimonialDetailProps> = ({ open, handleClose, row }) => {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("lg"));


    if (!row) {
        return <></>;
    }

    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="responsive-dialog-title">{"Détail du commentaire"}</DialogTitle>

                <DialogContent>
                    <DialogContentText>
                        {row && (row.user != undefined || row.user != null) ? (
                            <div
                                className={`nc-CardAuthor flex items-center mb-4`}
                                data-nc-id="CardAuthor"
                            >
                                <Avatar
                                    sizeClass="h-10 w-10 text-base"
                                    containerClassName="flex-shrink-0 mr-4"
                                    radius="rounded-full"
                                    imgUrl={row.user.avatar}
                                    userName={`${row.user.name} ${row.user.last_name}`}
                                />
                                <div>
                                    <h2
                                        className={`text-base text-neutral-900 dark:text-neutral-100 font-semibold`}
                                    >
                                        {`${row.user.name} ${row.user.last_name}`}
                                    </h2>
                                    <span
                                        className={`block mt-[2px] text-xs text-neutral-500 dark:text-neutral-400`}
                                    >
                                        {row.user.fonction}
                                    </span>
                                </div>
                            </div>
                        ) : null}

                        <div dangerouslySetInnerHTML={{ __html: row.message ?? "" }}></div>
                    </DialogContentText>
                </DialogContent>

                <DialogActions>
                    <Button autoFocus onClick={handleClose} color="error">
                        Fermer
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default SingleTestimonialDetail;
