import React, { FC, useEffect, useRef, useState } from "react";
import NcModal from "components/NcModal/NcModal";
import { CommentType } from "./CommentCard";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { useSnackbar } from "notistack";

export interface ModalDeleteCommentProps {
  commentId: CommentType["id"];
  show: boolean;
  onCloseModalDeleteComment: () => void;
  onCommentDeleted?: (commentId: CommentType["id"]) => void;
}

const ModalDeleteComment: FC<ModalDeleteCommentProps> = ({
  commentId,
  show,
  onCloseModalDeleteComment,
  onCommentDeleted,
}) => {
  const textareaRef = useRef(null);
  const snackbar = useSnackbar();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleClickSubmitForm = async () => {
    setIsDeleting(true);
    
    try {
      console.log("Suppression du commentaire ID:", commentId);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      snackbar.enqueueSnackbar("Commentaire supprimé avec succès", { 
        variant: "success", 
        autoHideDuration: 2000 
      });
      
      if (onCommentDeleted) {
        onCommentDeleted(commentId);
      }
      
      onCloseModalDeleteComment();
      
    } catch (error) {
      console.error("Erreur lors de la suppression du commentaire:", error);
      snackbar.enqueueSnackbar("Erreur lors de la suppression du commentaire", { 
        variant: "error", 
        autoHideDuration: 3000 
      });
    } finally {
      setIsDeleting(false);
    }
  };

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        const element: HTMLTextAreaElement | null = textareaRef.current;
        if (element) {
          (element as HTMLTextAreaElement).focus();
        }
      }, 400);
    }
  }, [show]);

  const renderContent = () => {
    return (
      <form action="#" onSubmit={(e) => { e.preventDefault(); handleClickSubmitForm(); }}>
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200 mb-4">
          Supprimer le commentaire
        </h3>
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-700">
                Êtes-vous sûr de vouloir supprimer ce commentaire définitivement ? Cette action ne peut pas être annulée.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end space-x-3">
          <ButtonSecondary 
            type="button" 
            onClick={onCloseModalDeleteComment}
            disabled={isDeleting}
          >
            Annuler
          </ButtonSecondary>
          <ButtonPrimary 
            type="submit"
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-500"
          >
            {isDeleting ? (
              <div className="flex items-center">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Suppression...
              </div>
            ) : (
              "Supprimer définitivement"
            )}
          </ButtonPrimary>
        </div>
      </form>
    );
  };

  const renderTrigger = () => {
    return null;
  };

  return (
    <NcModal
      isOpenProp={show}
      onCloseModal={onCloseModalDeleteComment}
      contentExtraClass="max-w-screen-sm"
      renderContent={renderContent}
      renderTrigger={renderTrigger}
      modalTitle=""
    />
  );
};

export default ModalDeleteComment;
