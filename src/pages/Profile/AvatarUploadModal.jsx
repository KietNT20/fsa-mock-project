import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Typography,
} from "@mui/material";

const AvatarUploadModal = ({
    isAvatarModalOpen,
    handleAvatarModalClose,
    handleFileChange,
    handleSaveAvatar,
    previewAvatar,
    isLoading,
    error,
    fileInputRef,
}) => {
    return (
        <Dialog
            open={isAvatarModalOpen}
            onClose={handleAvatarModalClose}
            maxWidth="md"
            fullWidth={true}
        >
            <DialogTitle
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: "2.4rem",
                    color: "#1565C0",
                }}
            >
                Upload New Avatar
            </DialogTitle>

            <DialogContent
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 5,
                }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    onChange={handleFileChange}
                    style={{
                        padding: "12px",
                        backgroundColor: "#f1f3f4",
                        borderRadius: "10px",
                        marginBottom: "25px",
                        width: "100%",
                        textAlign: "center",
                        fontSize: "1.6rem",
                    }}
                />

                {previewAvatar && (
                    <Box
                        textAlign="center"
                        sx={{
                            position: "relative",
                            width: 500,
                            height: 500,
                            overflow: "hidden",
                            borderRadius: "10px",
                            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
                            mb: 4,
                        }}
                    >
                        <Box
                            sx={{
                                width: 500,
                                height: 500,
                                backgroundImage: `url(${previewAvatar})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                cursor: "grab",
                            }}
                        />
                    </Box>
                )}

                {isLoading && (
                    <Typography sx={{ color: "#1565C0", fontWeight: "500" , textAlign: "center" , fontSize: "1.6rem"}}>
                        Uploading...
                    </Typography>
                )}
                {error && (
                    <Typography sx={{ color: "red", fontWeight: "500", textAlign: "center", fontSize: "1.6rem" }}>
                        Error: {error}
                    </Typography>
                )}
            </DialogContent>

            <DialogActions sx={{ justifyContent: "center", pb: 4 }}>
                <Button
                    onClick={handleSaveAvatar}
                    variant="contained"
                    sx={{
                        backgroundColor: "#1565C0",
                        color: "#fff",
                        fontWeight: "bold",
                        padding: "12px 25px",
                        fontSize: "1.4rem",
                        "&:hover": { backgroundColor: "#0d47a1" },
                    }}
                >
                    Save Avatar
                </Button>
                <Button
                    onClick={handleAvatarModalClose}
                    variant="outlined"
                    sx={{
                        color: "#1565C0",
                        borderColor: "#1565C0",
                        padding: "12px 25px",
                        fontSize: "1.4rem",
                        "&:hover": { borderColor: "#0d47a1", color: "#0d47a1" },
                    }}
                >
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default AvatarUploadModal;
