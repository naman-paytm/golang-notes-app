import "react-toastify/dist/ReactToastify.css";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { getNotesFn } from "./api/noteApi";
import NoteModal from "./components/note.modal";
import CreateNote from "./components/notes/create.note";
import NoteItem from "./components/notes/note.component";
import NProgress from "nprogress";

function AppContent() {
  const [openNoteModal, setOpenNoteModal] = useState(false);

  const {
    data: notes,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["getNotes"],
    queryFn: () => getNotesFn(),
    staleTime: 5 * 1000,
    select: (data) => data.notes,
    onSuccess() {
      NProgress.done();
    },
    onError(error: any) {
      const resMessage =
        error.response.data.message ||
        error.response.data.detail ||
        error.message ||
        error.toString();
      toast(resMessage, {
        type: "error",
        position: "top-right",
      });
      NProgress.done();
    },
  });

  useEffect(() => {
    if (isLoading || isFetching) {
      NProgress.start();
    }
  }, [isLoading, isFetching]);

  return (
    <div className="2xl:max-w-[90rem] max-w-[68rem] mx-auto">
      <button
        className="w-full h-15 p-5 mt-10 resize-none border rounded-md focus:outline-none bg-white text-lg font-medium mt-5 cursor-pointer text-left"
        onClick={() => setOpenNoteModal(true)}
      >
        Take a Note
      </button>

      <div className="m-8 grid grid-cols-[repeat(auto-fill,_320px)] gap-7 grid-rows-[1fr]">
        {/* Note Items */}

        {notes?.map((note) => (
          <NoteItem key={note.id} note={note} />
        ))}

        {/* Create Note Modal */}
        <NoteModal
          openNoteModal={openNoteModal}
          setOpenNoteModal={setOpenNoteModal}
        >
          <CreateNote setOpenNoteModal={setOpenNoteModal} />
        </NoteModal>
      </div>
    </div>
  );
}

function App() {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <AppContent />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

export default App;
