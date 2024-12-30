"use server"

import * as apiClient from "./api-client"

import { PaymentPackage } from "@/types"

export const getAllPaymentPackages = async (): Promise<PaymentPackage[]> =>
  apiClient.get("/payment-packages").then((data) => data.json())
