"use client";

import React, {
  createContext,
  useContext,
  useState,
  useCallback,
} from "react";

type MediaProps = {
  imgId: string | undefined;
  setImgId: (id: string | undefined) => void;
  imgLink: string | undefined;
  setImgLink: (link: string | undefined) => void;
  imageHeight: number;
  setImageHeight: (height: number) => void;
  imageWidth: number;
  setImageWidth: (width: number) => void;
  x: number;
  setX: (x: number) => void;
  y: number;
  setY: (y: number) => void;
  imageOpacity: number;
  setImageOpacity: (opacity: number) => void;
  caseColorOpacity: number;
  setCaseColorOpacity: (opacity: number) => void;
  caseColor: string;
  setCaseColor: (color: string) => void;
  canvasBgColor: string;
  setCanvasBgColor: (color: string) => void;
  lockAspectRatio: boolean;
  seTLockAspectRatio: (lockAspectRatio: boolean) => void;
  material: string;
  setMaterial: (material: string) => void;
  finish: string;
  setFinish: (finish: string) => void;
};

type ConfigProviderProps = {
  children: React.ReactNode;
};

// Set default colors
const initialValue: MediaProps = {
  imgId: undefined,
  setImgId: () => undefined,
  imgLink: undefined,
  setImgLink: () => undefined,
  imageHeight: 300,
  setImageHeight: () => undefined,
  imageWidth: 300,
  setImageWidth: () => undefined,
  x: 0,
  setX: () => undefined,
  y: 0,
  setY: () => undefined,
  imageOpacity: 100,
  setImageOpacity: () => undefined,
  caseColorOpacity: 50,
  setCaseColorOpacity: () => undefined,
  caseColor: "#ffffff", // Default case color
  setCaseColor: () => undefined,
  canvasBgColor: "#000000", // Default canvas background color
  setCanvasBgColor: () => undefined,
  lockAspectRatio: false,
  seTLockAspectRatio: () => undefined,
  material: "Silicone", // Default material
  setMaterial: () => undefined,
  finish: "Smooth Finish", // Default finish
  setFinish: () => undefined,
};

export const ConfigContext = createContext<MediaProps>(initialValue);

export const ConfigProvider = ({ children }: ConfigProviderProps) => {
  const [imgId, setImgId] = useState<string | undefined>(undefined);
  const [imgLink, setImgLink] = useState<string | undefined>(undefined);
  const [imageWidth, setImageWidth] = useState<number>(300);
  const [imageHeight, setImageHeight] = useState<number>(300);
  const [x, setX] = useState<number>(0);
  const [y, setY] = useState<number>(0);
  const [imageOpacity, setImageOpacity] = useState<number>(100);
  const [caseColorOpacity, setCaseColorOpacity] = useState<number>(50);
  const [caseColor, setCaseColor] = useState<string>("#ffffff"); // Default case color
  const [canvasBgColor, setCanvasBgColor] = useState<string>("#000000"); // Default canvas background color
  const [lockAspectRatio, seTLockAspectRatio] = useState<boolean>(false);
  const [material, setMaterial] = useState<string>("Silicone"); // Default material
  const [finish, setFinish] = useState<string>("Smooth Finish"); // Default finish

  const memoizedSetImgId = useCallback((id: string | undefined) => {
    setImgId(id);
  }, []);

  const memoizedSetImgLink = useCallback((link: string | undefined) => {
    setImgLink(link);
  }, []);

  const memoizedSetWidth = useCallback((width: number) => {
    setImageWidth(width);
  }, []);

  const memoizedSetHeight = useCallback((height: number) => {
    setImageHeight(height);
  }, []);

  const memoizedSetX = useCallback((x: number) => {
    setX(x);
  }, []);

  const memoizedSetY = useCallback((y: number) => {
    setY(y);
  }, []);

  const memoizedSetImageOpacity = useCallback((opacity: number) => {
    setImageOpacity(opacity);
  }, []);

  const memoizedSetCaseColorOpacity = useCallback((caseColorOpacity: number) => {
    setCaseColorOpacity(caseColorOpacity);
  }, []);

  const memoizedSetCaseColor = useCallback((caseColor: string) => {
    setCaseColor(caseColor);
  }, []);

  const memoizedSetCanvasBgColor = useCallback((canvasBgColor: string) => {
    setCanvasBgColor(canvasBgColor);
  }, []);

  const memoizedSeTLockAspectRatio = useCallback((lockAspectRatio: boolean) => {
    seTLockAspectRatio(lockAspectRatio);
  }, []);

  const memoizedSetMaterial = useCallback((material: string) => {
    setMaterial(material);
  }, []);

  const memoizedSetFinish = useCallback((finish: string) => {
    setFinish(finish);
  }, []);

  const value = {
    imgId,
    setImgId: memoizedSetImgId,
    imgLink,
    setImgLink: memoizedSetImgLink,
    imageWidth,
    setImageWidth: memoizedSetWidth,
    imageHeight,
    setImageHeight: memoizedSetHeight,
    x,
    setX: memoizedSetX,
    y,
    setY: memoizedSetY,
    imageOpacity,
    setImageOpacity: memoizedSetImageOpacity,
    caseColorOpacity,
    setCaseColorOpacity: memoizedSetCaseColorOpacity,
    caseColor,
    setCaseColor: memoizedSetCaseColor,
    canvasBgColor,
    setCanvasBgColor: memoizedSetCanvasBgColor,
    lockAspectRatio,
    seTLockAspectRatio: memoizedSeTLockAspectRatio,
    material,
    setMaterial: memoizedSetMaterial,
    finish,
    setFinish: memoizedSetFinish,
  };

  return (
    <ConfigContext.Provider value={value}>{children}</ConfigContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error("useConfig must be used within the ConfigProvider");
  }
  return context;
};
