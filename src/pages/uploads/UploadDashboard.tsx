import { useEffect, useState } from "react";
import UploadEmptyState from "../../components/upload/UploadEmptyState";
import { IoMdCheckmark } from "react-icons/io";
import { RiDeleteBin6Line, RiSaveLine } from "react-icons/ri";
import ImageBox from "../../components/upload/FileBox";
import { uploadedImages } from "../../utils/constants";
import EditModal from "./EditModal";
import { useLocation } from "react-router-dom";
import { getToken, getuser } from "../../services/AuthServices";
import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { saveDraft, createStock, draftToStock } from "./action";
import LoadingSpinner from "../../components/LoadingSpinner";
import { toast } from "react-toastify";
import { Stock } from "../../types";
import { baseAPI } from "../../utils/apiUrls";
import InventoryTableRow from "../../components/dashboard/InventryTableRow";
import { FiInfo, FiX } from "react-icons/fi";

type ActiveEditedObject = {
  name?: string;
  main_file?: string;
  imgUrl?: string;
  description?: string;
  keywords?: string[];
  location?: string;
  explicit?: boolean;
  fileType?: string;
  usageType?: string;
  releaseForm?: string[];
};

interface FileObject {
  id: string;
  name: string;
}
interface ImageObject {
  id: string;
  imgUrl: string;
  name: string;
  main_file: string;
  description?: string; // optional field, can be undefined if not provided
  keywords?: string[]; // optional field, array of strings
  location?: string; // optional field
  explicit?: boolean; // optional field, boolean
  fileType?: string; // optional field
  usageType?: string; // optional field
  releaseForm?: string[]; // optional field, array of strings
  matured_content?: boolean; // optional field, boolean
  type?: string; // optional field
  usage_rights?: string; // optional field
  file?: string
}

type UploadedImage = {
  id: number;
  imgUrl: string;
  name: string;
  usageType: string;
  description: string;
  keywords: string[];
  explicit: boolean;
  releaseForm: string[];
  fileType: string;
  main_file: string;
  location: string;
};

export default function UploadDashboard() {
  const location = useLocation();

  const { imageUrl } = location.state || {};

  const [data] = useState<UploadedImage[]>(uploadedImages);
  const [tab, setTab] = useState<number>(0);
  const [toggleEditMode, setToggleEditMode] = useState<boolean>(false);
  const [activeEditedObject, setActiveEditedObject] = useState<
    ImageObject | object
  >({});
  const [fetchedCollections, setFetchedCollections] = useState<
    ImageObject[] | undefined
  >([]);
  const [selectedDrafts, setSelectedDrafts] = useState<ImageObject[]>([])
  const [errorMessage, setErrorMessage] = useState("");
  const [payload, setPayload] = useState<ActiveEditedObject>({
    name: "",
    main_file: "",
    description: "",
    keywords: [],
    explicit: false,
    fileType: "",
    usageType: "",
    location: "",
    releaseForm: [],
    imgUrl: "",
  });
  const [myStocks, setMyStocks] = useState<Stock[]>()
  const [fetchingStocks, setFetchingStocks] = useState<boolean>(false)
  const [activeStock, setActiveStock] = useState<Stock>();
  const [stockModal, setStockModal] = useState<boolean>(false)
  const [imageUrls, setImageUrls] = useState<ImageObject[]>(imageUrl);

  const user = getuser().user;

  console.log(imageUrls,)

  const toggleStock = (stock?: Stock) => {
    if (stock) {
      setActiveStock(stock)
    }

    setStockModal(true)
  }

  const getMyStocks = async () => {
    setFetchingStocks(true)
    try {
      const token = getToken();
      const response = await axios.get(
        // `${baseAPI}/contributor/drafts/`,
        `${baseAPI}/contributor/my-stocks/${user.id}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFetchingStocks(false)
      setMyStocks(response.data)
    } catch (error) {
      setFetchingStocks(false)
      console.log(error);
    }
  };

  const showError = (message: string) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage("");
    }, 6000);
  };

  const handleDataChange = (updatedData: Partial<ActiveEditedObject>) => {
    setPayload((prev) => ({ ...prev, ...updatedData }));
  };

  const uploadSelected = async () => {
    if (selectedDrafts?.length === 0) {
      toast.error('No selected stocks');
      return;
    } else {
      const batchSize = 10; // Number of items to process in each batch
      for (let i = 0; i < selectedDrafts.length; i += batchSize) {
        const batch = selectedDrafts?.slice(i, i + batchSize);
        await Promise.all(batch?.map(draft => handleDraftToStock(draft)));
      }

      toast.success('All selected stocks have been uploaded');
    }
  };

  const handleImageSelect = async (file: ImageObject) => {
    if (
      activeEditedObject &&
      (activeEditedObject as FileObject).id === file.id
    ) {
      setPayload({
        name: "",
        main_file: "",
        description: "",
        keywords: [],
        explicit: false,
        fileType: "",
        usageType: "",
        location: "",
        releaseForm: [],
        imgUrl: "",
      });
      setActiveEditedObject({});
    } else {
      let selectedFile: ImageObject | undefined;

      if (file.imgUrl && file.imgUrl.startsWith("blob:")) {
        selectedFile = imageUrls.find(
          (image: ImageObject) => image.id === file.id
        );
        if (selectedFile) {
          setActiveEditedObject(selectedFile);
        } else {
          setActiveEditedObject({});
        }
        setPayload((prev) => {
          return {
            ...prev,
            name: selectedFile?.name,
            main_file: selectedFile?.file,
            imgUrl: selectedFile?.imgUrl,
          };
        });
        setToggleEditMode(true);
      } else if (file.main_file) {
        const selectedFile: ImageObject = { ...file, imgUrl: file.main_file };
        setActiveEditedObject(selectedFile);
        setPayload((prev) => ({
          ...prev,
          name: selectedFile.name,
          main_file: selectedFile.main_file || prev.main_file,
          imgUrl: selectedFile.imgUrl,
          description: selectedFile.description || prev.description,
          keywords: Array.isArray(selectedFile.keywords)
            ? selectedFile.keywords
            : prev.keywords,
          location: selectedFile.location || prev.location,
          explicit: selectedFile.explicit || prev.explicit,
          fileType: selectedFile.fileType || prev.fileType,
          usageType: selectedFile.usageType || prev.usageType,
          releaseForm: selectedFile.releaseForm || prev.releaseForm,
        }));
        setToggleEditMode(true);
      }
    }
  };

  const fetchCollections = async () => {
    try {
      const token = getToken();
      const response = await axios.get(
        `${baseAPI}/contributor/drafts/`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      setFetchedCollections(response?.data);
    } catch (error) {
      console.log(error);
    }
  };

  const saveDraftMutation = useMutation({
    mutationFn: saveDraft,
    onSuccess: (data) => {
      fetchCollections();
      setToggleEditMode(false);
      if (data?.status === "error") {
        setErrorMessage(data.message.email[0]);
      }
    },
  });

  const createStockMutation = useMutation({
    mutationFn: createStock,
    onSuccess: (data) => {
      fetchCollections();
      setToggleEditMode(false);
      if (data?.status === "error") {
        setErrorMessage(data.message.email[0]);
      }
    },
  });

  const createDraftToStockMutation = useMutation({
    mutationFn: draftToStock,
    onSuccess: (data) => {
      fetchCollections();
      setToggleEditMode(false);
      if (data?.status === "error") {
        setErrorMessage(data.message.email[0]);
      }
    },
  });

  const handleSaveDraft = (object: ActiveEditedObject) => {
    setImageUrls(prevImageUrls => prevImageUrls.filter(img => img.imgUrl !== object.imgUrl));
    setErrorMessage("");
    if (!object.main_file || !object.keywords) {
      showError("Keywords are required!");
      return;
    }
    const newPayload = {
      user: 1,
      ...object,
      keywords: object.keywords,
      category: 1,
      type: "Image"
    };
    saveDraftMutation.mutate(newPayload);
  };

  const handleCreateStock = (object: ActiveEditedObject) => {
    setImageUrls(prevImageUrls => prevImageUrls.filter(img => img.imgUrl !== object.imgUrl));
    setErrorMessage("");
    if (!object.main_file || !object.keywords) {
      showError("Keywords are required!");
      return;
    }

    const newPayload = {
      user: 1,
      ...object,
      keywords: object.keywords.length === 0 ? ["null"] : object.keywords,
      category: 1,
      type: "Image"
    };
    createStockMutation.mutate(newPayload);
  };

  const handleDraftToStock = (object: ImageObject) => {
    setImageUrls(prevImageUrls => prevImageUrls.filter(img => img.imgUrl !== object.imgUrl));
    setErrorMessage("");
    if (!object.main_file || !object.keywords) {
      showError("Keywords are required!");
      return;
    }

    const newPayload: Stock = {
      user: 1,
      ...object,
      id: Number(object.id),
      keywords: object.keywords.length === 0 ? ["null"] : object.keywords,
      category: 1,
      draft_id: Number(object.id),
      type: "Image",
    };
    createDraftToStockMutation.mutate(newPayload);
  };

  useEffect(() => {
    fetchCollections();
  }, []);

  useEffect(() => {
    if (tab === 2) {
      getMyStocks()
    }
  }, [tab])

  return (
    <main className="lg:pt-0 pt-[100px] h-[90vh] scroll overflow-x-hidden relative">
      <div className="bg-white lg:px-14 px-5 w-full flex justify-between">
        <div className="flex gap-6 w-full">
          <button
            onClick={() => setTab(0)}
            className={`${tab === 0
              ? "border-accent font-bold"
              : "text-primary_black border-transparent"
              } py-4 border-b-[6px] transition-all duration-200 ease-linear text-sm`}
          >
            Upload
          </button>
          <button
            onClick={() => setTab(1)}
            className={`${tab === 1
              ? "border-accent font-bold"
              : "text-primary_black border-transparent"
              } py-4 border-b-[6px] transition-all duration-200 ease-linear text-sm`}
          >
            Saved
          </button>
          <button
            onClick={() => setTab(2)}
            className={`${tab === 2
              ? "border-accent font-bold"
              : "text-primary_black border-transparent"
              } py-4 border-b-[6px] transition-all duration-200 ease-linear text-sm`}
          >
            Submitted
          </button>
          <button
            onClick={() => setTab(3)}
            className={`${tab === 3
              ? "border-accent font-bold"
              : "text-primary_black border-transparent"
              } py-4 border-b-[6px] transition-all duration-200 ease-linear text-sm`}
          >
            Release Forms
          </button>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={uploadSelected} className="flex items-center flex-col outline-none">
            <IoMdCheckmark />
            <p className="text-xs text-primary_black leading-3 mt-[3px]">
              Upload Selected
            </p>
          </button>
          <button className="flex items-center flex-col outline-none">
            <RiDeleteBin6Line />
            <p className="text-xs text-primary_black leading-3 mt-[3px]">
              Delete
            </p>
          </button>
          {saveDraftMutation.isPending ? (
            <LoadingSpinner />
          ) : (
            <button
              onClick={
                !toggleEditMode
                  ? () => setToggleEditMode(!toggleEditMode)
                  : () => handleSaveDraft(payload)
              }
              className="flex items-center flex-col outline-none"
            >
              <RiSaveLine />

              <p className="text-xs text-primary_black leading-3 mt-[3px] w-[34px]">
                {toggleEditMode ? "Save" : "Edit"}
              </p>
            </button>
          )}
        </div>
      </div>
      <div
        className={`${toggleEditMode ? "w-[75%]" : "w-full "
          } duration-300 transition-all ease-linear`}
      >
        {tab === 0 && (
          <div className="relative">
            {data.length === 0 ? (
              <div className="grid justify-center mt-40">
                <UploadEmptyState heading="No Content Uploaded Yet" />
              </div>
            ) : (
              <div className="lg:px-14 px-5 py-14">
                <p className="text-red-500 text-sm absolute right-[15%] top-5">
                  {errorMessage}
                </p>

                <div className="flex gap-5 flex-wrap ease-linear duration-200 transition-all">
                  {imageUrls?.map((img: ImageObject) => (
                    <ImageBox
                      handleSelectFile={() => handleImageSelect(img)}
                      active={activeEditedObject}
                      id={img.id}
                      key={img.id}
                      name={img?.name}
                      imageUrl={img?.imgUrl}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 1 && (
          <div>
            {data.length === 0 ? (
              <div className="grid justify-center mt-40">
                <UploadEmptyState heading="You currently have no saved content" />
              </div>
            ) : (
              <div className="lg:px-14 px-5 py-14">
                <div className="flex gap-5 flex-wrap ease-linear duration-200 transition-all">
                  {fetchedCollections?.map((img: ImageObject) => {
                    return (
                      <ImageBox
                        handleSelectFile={() => {
                          setSelectedDrafts((prev) => {
                            if (prev!.includes(img)) {
                              return prev!.filter(item => item !== img);
                            } else {
                              return [...prev!, img];
                            }
                          });
                        }}
                        active={activeEditedObject}
                        selected={selectedDrafts?.includes(img)}
                        id={img.id}
                        key={img.id}
                        name={img?.name}
                        imageUrl={img?.main_file}
                        handleEditFile={() => { handleImageSelect(img) }}
                      />
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        {tab === 2 && (
          <div
            // className={`${
            //   layout === "grid" ? "grid grid-cols-2 gap-5" : ""
            // } overflow-y-scroll h-full pb-[85px] pr-5 duration-200 transition-all ease-linear`}
            className="text-center"
          >
            {fetchingStocks ?
              <LoadingSpinner />
              : myStocks?.length === 0 ? (
                <div className="grid justify-center mt-40">
                  <UploadEmptyState heading="You currently have no Submitted content" />
                </div>
              ) :
                <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,max-content))] p-4 justify-start gap-4">
                  {myStocks?.map((stock, i) => (
                    <InventoryTableRow setStock={toggleStock} stock={stock} key={i} />
                  ))}
                </div>
            }
          </div>
        )}
        {tab === 3 && (
          <div>
            {data.length === 0 ? (
              <div className="grid justify-center mt-40">
                <UploadEmptyState heading="You currently have no Submitted content" />
              </div>
            ) : (
              <div>edit here</div>
            )}
          </div>
        )}
      </div>
      <div
        className={`${toggleEditMode ? "translate-x-0" : "translate-x-[500px]"
          } absolute h-[90vh] overflow-y-scroll bg-white w-[35%] top-[53px] right-0 duration-300 transition-all ease-linear`}
      >
        <div className="">
          {Object.entries(activeEditedObject).length === 0 ? (
            <div className="h-full grid place-items-center pt-28">
              <div className="w-[245px] flex flex-col items-center gap-5 text-center">
                <p className="text-[28px] font-bold text-primary_black">
                  Select a file to edit details
                </p>
                <p className="text-sm text-[#B0B0B0]">
                  Select multiple items by clicking the checkboxes
                </p>
              </div>
            </div>
          ) : (
            <EditModal
              loading={createStockMutation.isPending}
              handleCreateStock={handleCreateStock}
              data={payload}
              onDataChange={handleDataChange}
            />
          )}
        </div>
      </div>

      {stockModal &&
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 relative rounded-lg shadow-lg mt-4 w-[90%] lg:w-[65%] max-h-[70%] overflow-auto">
            <div onClick={() => setStockModal(false)} className="absolute top-4 right-4 cursor-pointer text-black">
              <FiX size={20} />
            </div>
            <div className="flex flex-col lg:flex-row lg:gap-8 lg:items-center">
              <div className="flex-[2]">
                <h2 className="text-lg font-semibold mb-1">{activeStock?.description}</h2>

                <p className="text-xs mb-2">#{activeStock?.stock_id}</p>

                <img src={activeStock?.main_file} className="w-full bg-neutral-200 h-[400px] bg-red object-contain" alt="" />
              </div>
              <div className="flex-[1] mt-4 flex flex-col gap-4">
                <div className="flex gap-8">
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-1">File Type <FiInfo /></p>
                    <p className="mt-2 text-xs font-light bg-neutral-100 border-neutral-200 text-center text-neutral-500 border-[1px] rounded-md">{activeStock?.type}</p>
                  </div>
                  <div>
                    <p className="font-semibold text-sm flex items-center gap-1">Usage Type <FiInfo /></p>
                    <p className="mt-2 text-xs font-light bg-neutral-100 border-neutral-200 text-center text-neutral-500 border-[1px] rounded-md">Commercial</p>
                  </div>
                </div>

                <div>
                  <p className="font-semibold text-sm flex items-center gap-1">Keywords <FiInfo /></p>

                  <div className="mt-2 flex gap-2 flex-wrap">
                    {activeStock?.keywords?.map((keyword, i) => (
                      <p key={i} className="text-xs bg-neutral-100 text-neutral-500 px-2 py-1 rounded-md">{keyword}</p>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" disabled checked={activeStock?.matured_content} />
                  <p className="text-xs text-neutral-500">Mature Content</p>
                </div>

                <div>
                  <p className="font-semibold flex items-center gap-2">Release form <FiInfo /></p>

                  <a className="text-xs text-accent" href={activeStock?.main_file}>Release form</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      }

    </main>
  );
}
