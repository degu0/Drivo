import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums.js";
import type * as Prisma from "../internal/prismaNamespace.js";
export type VehicleModel = runtime.Types.Result.DefaultSelection<Prisma.$VehiclePayload>;
export type AggregateVehicle = {
    _count: VehicleCountAggregateOutputType | null;
    _avg: VehicleAvgAggregateOutputType | null;
    _sum: VehicleSumAggregateOutputType | null;
    _min: VehicleMinAggregateOutputType | null;
    _max: VehicleMaxAggregateOutputType | null;
};
export type VehicleAvgAggregateOutputType = {
    manufactureYear: number | null;
    modelYear: number | null;
};
export type VehicleSumAggregateOutputType = {
    manufactureYear: number | null;
    modelYear: number | null;
};
export type VehicleMinAggregateOutputType = {
    id: string | null;
    imageUrl: string | null;
    plate: string | null;
    chassis: string | null;
    renavam: string | null;
    brand: string | null;
    model: string | null;
    manufactureYear: number | null;
    modelYear: number | null;
    color: string | null;
    fuel: $Enums.FuelType | null;
    type: $Enums.VehicleType | null;
    nickname: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicleMaxAggregateOutputType = {
    id: string | null;
    imageUrl: string | null;
    plate: string | null;
    chassis: string | null;
    renavam: string | null;
    brand: string | null;
    model: string | null;
    manufactureYear: number | null;
    modelYear: number | null;
    color: string | null;
    fuel: $Enums.FuelType | null;
    type: $Enums.VehicleType | null;
    nickname: string | null;
    userId: string | null;
    createdAt: Date | null;
    updatedAt: Date | null;
};
export type VehicleCountAggregateOutputType = {
    id: number;
    imageUrl: number;
    plate: number;
    chassis: number;
    renavam: number;
    brand: number;
    model: number;
    manufactureYear: number;
    modelYear: number;
    color: number;
    fuel: number;
    type: number;
    nickname: number;
    userId: number;
    createdAt: number;
    updatedAt: number;
    _all: number;
};
export type VehicleAvgAggregateInputType = {
    manufactureYear?: true;
    modelYear?: true;
};
export type VehicleSumAggregateInputType = {
    manufactureYear?: true;
    modelYear?: true;
};
export type VehicleMinAggregateInputType = {
    id?: true;
    imageUrl?: true;
    plate?: true;
    chassis?: true;
    renavam?: true;
    brand?: true;
    model?: true;
    manufactureYear?: true;
    modelYear?: true;
    color?: true;
    fuel?: true;
    type?: true;
    nickname?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicleMaxAggregateInputType = {
    id?: true;
    imageUrl?: true;
    plate?: true;
    chassis?: true;
    renavam?: true;
    brand?: true;
    model?: true;
    manufactureYear?: true;
    modelYear?: true;
    color?: true;
    fuel?: true;
    type?: true;
    nickname?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
};
export type VehicleCountAggregateInputType = {
    id?: true;
    imageUrl?: true;
    plate?: true;
    chassis?: true;
    renavam?: true;
    brand?: true;
    model?: true;
    manufactureYear?: true;
    modelYear?: true;
    color?: true;
    fuel?: true;
    type?: true;
    nickname?: true;
    userId?: true;
    createdAt?: true;
    updatedAt?: true;
    _all?: true;
};
export type VehicleAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    _count?: true | VehicleCountAggregateInputType;
    _avg?: VehicleAvgAggregateInputType;
    _sum?: VehicleSumAggregateInputType;
    _min?: VehicleMinAggregateInputType;
    _max?: VehicleMaxAggregateInputType;
};
export type GetVehicleAggregateType<T extends VehicleAggregateArgs> = {
    [P in keyof T & keyof AggregateVehicle]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateVehicle[P]> : Prisma.GetScalarType<T[P], AggregateVehicle[P]>;
};
export type VehicleGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithAggregationInput | Prisma.VehicleOrderByWithAggregationInput[];
    by: Prisma.VehicleScalarFieldEnum[] | Prisma.VehicleScalarFieldEnum;
    having?: Prisma.VehicleScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: VehicleCountAggregateInputType | true;
    _avg?: VehicleAvgAggregateInputType;
    _sum?: VehicleSumAggregateInputType;
    _min?: VehicleMinAggregateInputType;
    _max?: VehicleMaxAggregateInputType;
};
export type VehicleGroupByOutputType = {
    id: string;
    imageUrl: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname: string | null;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
    _count: VehicleCountAggregateOutputType | null;
    _avg: VehicleAvgAggregateOutputType | null;
    _sum: VehicleSumAggregateOutputType | null;
    _min: VehicleMinAggregateOutputType | null;
    _max: VehicleMaxAggregateOutputType | null;
};
export type GetVehicleGroupByPayload<T extends VehicleGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<VehicleGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof VehicleGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], VehicleGroupByOutputType[P]> : Prisma.GetScalarType<T[P], VehicleGroupByOutputType[P]>;
}>>;
export type VehicleWhereInput = {
    AND?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    OR?: Prisma.VehicleWhereInput[];
    NOT?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    id?: Prisma.StringFilter<"Vehicle"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Vehicle"> | string | null;
    plate?: Prisma.StringFilter<"Vehicle"> | string;
    chassis?: Prisma.StringFilter<"Vehicle"> | string;
    renavam?: Prisma.StringFilter<"Vehicle"> | string;
    brand?: Prisma.StringFilter<"Vehicle"> | string;
    model?: Prisma.StringFilter<"Vehicle"> | string;
    manufactureYear?: Prisma.IntFilter<"Vehicle"> | number;
    modelYear?: Prisma.IntFilter<"Vehicle"> | number;
    color?: Prisma.StringFilter<"Vehicle"> | string;
    fuel?: Prisma.EnumFuelTypeFilter<"Vehicle"> | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType;
    nickname?: Prisma.StringNullableFilter<"Vehicle"> | string | null;
    userId?: Prisma.StringFilter<"Vehicle"> | string;
    createdAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
};
export type VehicleOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    chassis?: Prisma.SortOrder;
    renavam?: Prisma.SortOrder;
    brand?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    nickname?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
};
export type VehicleWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    plate?: string;
    chassis?: string;
    renavam?: string;
    AND?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    OR?: Prisma.VehicleWhereInput[];
    NOT?: Prisma.VehicleWhereInput | Prisma.VehicleWhereInput[];
    imageUrl?: Prisma.StringNullableFilter<"Vehicle"> | string | null;
    brand?: Prisma.StringFilter<"Vehicle"> | string;
    model?: Prisma.StringFilter<"Vehicle"> | string;
    manufactureYear?: Prisma.IntFilter<"Vehicle"> | number;
    modelYear?: Prisma.IntFilter<"Vehicle"> | number;
    color?: Prisma.StringFilter<"Vehicle"> | string;
    fuel?: Prisma.EnumFuelTypeFilter<"Vehicle"> | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType;
    nickname?: Prisma.StringNullableFilter<"Vehicle"> | string | null;
    userId?: Prisma.StringFilter<"Vehicle"> | string;
    createdAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
}, "id" | "plate" | "chassis" | "renavam">;
export type VehicleOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrderInput | Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    chassis?: Prisma.SortOrder;
    renavam?: Prisma.SortOrder;
    brand?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    nickname?: Prisma.SortOrderInput | Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
    _count?: Prisma.VehicleCountOrderByAggregateInput;
    _avg?: Prisma.VehicleAvgOrderByAggregateInput;
    _max?: Prisma.VehicleMaxOrderByAggregateInput;
    _min?: Prisma.VehicleMinOrderByAggregateInput;
    _sum?: Prisma.VehicleSumOrderByAggregateInput;
};
export type VehicleScalarWhereWithAggregatesInput = {
    AND?: Prisma.VehicleScalarWhereWithAggregatesInput | Prisma.VehicleScalarWhereWithAggregatesInput[];
    OR?: Prisma.VehicleScalarWhereWithAggregatesInput[];
    NOT?: Prisma.VehicleScalarWhereWithAggregatesInput | Prisma.VehicleScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    imageUrl?: Prisma.StringNullableWithAggregatesFilter<"Vehicle"> | string | null;
    plate?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    chassis?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    renavam?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    brand?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    model?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    manufactureYear?: Prisma.IntWithAggregatesFilter<"Vehicle"> | number;
    modelYear?: Prisma.IntWithAggregatesFilter<"Vehicle"> | number;
    color?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    fuel?: Prisma.EnumFuelTypeWithAggregatesFilter<"Vehicle"> | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeWithAggregatesFilter<"Vehicle"> | $Enums.VehicleType;
    nickname?: Prisma.StringNullableWithAggregatesFilter<"Vehicle"> | string | null;
    userId?: Prisma.StringWithAggregatesFilter<"Vehicle"> | string;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeWithAggregatesFilter<"Vehicle"> | Date | string;
};
export type VehicleCreateInput = {
    id?: string;
    imageUrl?: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
    user: Prisma.UserCreateNestedOneWithoutVehiclesInput;
};
export type VehicleUncheckedCreateInput = {
    id?: string;
    imageUrl?: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname?: string | null;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    user?: Prisma.UserUpdateOneRequiredWithoutVehiclesNestedInput;
};
export type VehicleUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleCreateManyInput = {
    id?: string;
    imageUrl?: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname?: string | null;
    userId: string;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleListRelationFilter = {
    every?: Prisma.VehicleWhereInput;
    some?: Prisma.VehicleWhereInput;
    none?: Prisma.VehicleWhereInput;
};
export type VehicleOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type VehicleCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    chassis?: Prisma.SortOrder;
    renavam?: Prisma.SortOrder;
    brand?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    nickname?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleAvgOrderByAggregateInput = {
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
};
export type VehicleMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    chassis?: Prisma.SortOrder;
    renavam?: Prisma.SortOrder;
    brand?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    nickname?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    imageUrl?: Prisma.SortOrder;
    plate?: Prisma.SortOrder;
    chassis?: Prisma.SortOrder;
    renavam?: Prisma.SortOrder;
    brand?: Prisma.SortOrder;
    model?: Prisma.SortOrder;
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
    color?: Prisma.SortOrder;
    fuel?: Prisma.SortOrder;
    type?: Prisma.SortOrder;
    nickname?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    updatedAt?: Prisma.SortOrder;
};
export type VehicleSumOrderByAggregateInput = {
    manufactureYear?: Prisma.SortOrder;
    modelYear?: Prisma.SortOrder;
};
export type VehicleCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VehicleCreateWithoutUserInput, Prisma.VehicleUncheckedCreateWithoutUserInput> | Prisma.VehicleCreateWithoutUserInput[] | Prisma.VehicleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicleCreateOrConnectWithoutUserInput | Prisma.VehicleCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VehicleCreateManyUserInputEnvelope;
    connect?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
};
export type VehicleUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.VehicleCreateWithoutUserInput, Prisma.VehicleUncheckedCreateWithoutUserInput> | Prisma.VehicleCreateWithoutUserInput[] | Prisma.VehicleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicleCreateOrConnectWithoutUserInput | Prisma.VehicleCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.VehicleCreateManyUserInputEnvelope;
    connect?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
};
export type VehicleUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VehicleCreateWithoutUserInput, Prisma.VehicleUncheckedCreateWithoutUserInput> | Prisma.VehicleCreateWithoutUserInput[] | Prisma.VehicleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicleCreateOrConnectWithoutUserInput | Prisma.VehicleCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VehicleUpsertWithWhereUniqueWithoutUserInput | Prisma.VehicleUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VehicleCreateManyUserInputEnvelope;
    set?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    disconnect?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    delete?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    connect?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    update?: Prisma.VehicleUpdateWithWhereUniqueWithoutUserInput | Prisma.VehicleUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VehicleUpdateManyWithWhereWithoutUserInput | Prisma.VehicleUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VehicleScalarWhereInput | Prisma.VehicleScalarWhereInput[];
};
export type VehicleUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.VehicleCreateWithoutUserInput, Prisma.VehicleUncheckedCreateWithoutUserInput> | Prisma.VehicleCreateWithoutUserInput[] | Prisma.VehicleUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.VehicleCreateOrConnectWithoutUserInput | Prisma.VehicleCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.VehicleUpsertWithWhereUniqueWithoutUserInput | Prisma.VehicleUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.VehicleCreateManyUserInputEnvelope;
    set?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    disconnect?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    delete?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    connect?: Prisma.VehicleWhereUniqueInput | Prisma.VehicleWhereUniqueInput[];
    update?: Prisma.VehicleUpdateWithWhereUniqueWithoutUserInput | Prisma.VehicleUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.VehicleUpdateManyWithWhereWithoutUserInput | Prisma.VehicleUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.VehicleScalarWhereInput | Prisma.VehicleScalarWhereInput[];
};
export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null;
};
export type IntFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumFuelTypeFieldUpdateOperationsInput = {
    set?: $Enums.FuelType;
};
export type EnumVehicleTypeFieldUpdateOperationsInput = {
    set?: $Enums.VehicleType;
};
export type VehicleCreateWithoutUserInput = {
    id?: string;
    imageUrl?: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleUncheckedCreateWithoutUserInput = {
    id?: string;
    imageUrl?: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleCreateOrConnectWithoutUserInput = {
    where: Prisma.VehicleWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicleCreateWithoutUserInput, Prisma.VehicleUncheckedCreateWithoutUserInput>;
};
export type VehicleCreateManyUserInputEnvelope = {
    data: Prisma.VehicleCreateManyUserInput | Prisma.VehicleCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type VehicleUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.VehicleWhereUniqueInput;
    update: Prisma.XOR<Prisma.VehicleUpdateWithoutUserInput, Prisma.VehicleUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.VehicleCreateWithoutUserInput, Prisma.VehicleUncheckedCreateWithoutUserInput>;
};
export type VehicleUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.VehicleWhereUniqueInput;
    data: Prisma.XOR<Prisma.VehicleUpdateWithoutUserInput, Prisma.VehicleUncheckedUpdateWithoutUserInput>;
};
export type VehicleUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.VehicleScalarWhereInput;
    data: Prisma.XOR<Prisma.VehicleUpdateManyMutationInput, Prisma.VehicleUncheckedUpdateManyWithoutUserInput>;
};
export type VehicleScalarWhereInput = {
    AND?: Prisma.VehicleScalarWhereInput | Prisma.VehicleScalarWhereInput[];
    OR?: Prisma.VehicleScalarWhereInput[];
    NOT?: Prisma.VehicleScalarWhereInput | Prisma.VehicleScalarWhereInput[];
    id?: Prisma.StringFilter<"Vehicle"> | string;
    imageUrl?: Prisma.StringNullableFilter<"Vehicle"> | string | null;
    plate?: Prisma.StringFilter<"Vehicle"> | string;
    chassis?: Prisma.StringFilter<"Vehicle"> | string;
    renavam?: Prisma.StringFilter<"Vehicle"> | string;
    brand?: Prisma.StringFilter<"Vehicle"> | string;
    model?: Prisma.StringFilter<"Vehicle"> | string;
    manufactureYear?: Prisma.IntFilter<"Vehicle"> | number;
    modelYear?: Prisma.IntFilter<"Vehicle"> | number;
    color?: Prisma.StringFilter<"Vehicle"> | string;
    fuel?: Prisma.EnumFuelTypeFilter<"Vehicle"> | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFilter<"Vehicle"> | $Enums.VehicleType;
    nickname?: Prisma.StringNullableFilter<"Vehicle"> | string | null;
    userId?: Prisma.StringFilter<"Vehicle"> | string;
    createdAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
    updatedAt?: Prisma.DateTimeFilter<"Vehicle"> | Date | string;
};
export type VehicleCreateManyUserInput = {
    id?: string;
    imageUrl?: string | null;
    plate: string;
    chassis: string;
    renavam: string;
    brand: string;
    model: string;
    manufactureYear: number;
    modelYear: number;
    color: string;
    fuel: $Enums.FuelType;
    type: $Enums.VehicleType;
    nickname?: string | null;
    createdAt?: Date | string;
    updatedAt?: Date | string;
};
export type VehicleUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    imageUrl?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    plate?: Prisma.StringFieldUpdateOperationsInput | string;
    chassis?: Prisma.StringFieldUpdateOperationsInput | string;
    renavam?: Prisma.StringFieldUpdateOperationsInput | string;
    brand?: Prisma.StringFieldUpdateOperationsInput | string;
    model?: Prisma.StringFieldUpdateOperationsInput | string;
    manufactureYear?: Prisma.IntFieldUpdateOperationsInput | number;
    modelYear?: Prisma.IntFieldUpdateOperationsInput | number;
    color?: Prisma.StringFieldUpdateOperationsInput | string;
    fuel?: Prisma.EnumFuelTypeFieldUpdateOperationsInput | $Enums.FuelType;
    type?: Prisma.EnumVehicleTypeFieldUpdateOperationsInput | $Enums.VehicleType;
    nickname?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    updatedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type VehicleSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    imageUrl?: boolean;
    plate?: boolean;
    chassis?: boolean;
    renavam?: boolean;
    brand?: boolean;
    model?: boolean;
    manufactureYear?: boolean;
    modelYear?: boolean;
    color?: boolean;
    fuel?: boolean;
    type?: boolean;
    nickname?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicle"]>;
export type VehicleSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    imageUrl?: boolean;
    plate?: boolean;
    chassis?: boolean;
    renavam?: boolean;
    brand?: boolean;
    model?: boolean;
    manufactureYear?: boolean;
    modelYear?: boolean;
    color?: boolean;
    fuel?: boolean;
    type?: boolean;
    nickname?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicle"]>;
export type VehicleSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    imageUrl?: boolean;
    plate?: boolean;
    chassis?: boolean;
    renavam?: boolean;
    brand?: boolean;
    model?: boolean;
    manufactureYear?: boolean;
    modelYear?: boolean;
    color?: boolean;
    fuel?: boolean;
    type?: boolean;
    nickname?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["vehicle"]>;
export type VehicleSelectScalar = {
    id?: boolean;
    imageUrl?: boolean;
    plate?: boolean;
    chassis?: boolean;
    renavam?: boolean;
    brand?: boolean;
    model?: boolean;
    manufactureYear?: boolean;
    modelYear?: boolean;
    color?: boolean;
    fuel?: boolean;
    type?: boolean;
    nickname?: boolean;
    userId?: boolean;
    createdAt?: boolean;
    updatedAt?: boolean;
};
export type VehicleOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "imageUrl" | "plate" | "chassis" | "renavam" | "brand" | "model" | "manufactureYear" | "modelYear" | "color" | "fuel" | "type" | "nickname" | "userId" | "createdAt" | "updatedAt", ExtArgs["result"]["vehicle"]>;
export type VehicleInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VehicleIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type VehicleIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
};
export type $VehiclePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Vehicle";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        imageUrl: string | null;
        plate: string;
        chassis: string;
        renavam: string;
        brand: string;
        model: string;
        manufactureYear: number;
        modelYear: number;
        color: string;
        fuel: $Enums.FuelType;
        type: $Enums.VehicleType;
        nickname: string | null;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
    }, ExtArgs["result"]["vehicle"]>;
    composites: {};
};
export type VehicleGetPayload<S extends boolean | null | undefined | VehicleDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$VehiclePayload, S>;
export type VehicleCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<VehicleFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: VehicleCountAggregateInputType | true;
};
export interface VehicleDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Vehicle'];
        meta: {
            name: 'Vehicle';
        };
    };
    findUnique<T extends VehicleFindUniqueArgs>(args: Prisma.SelectSubset<T, VehicleFindUniqueArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findUniqueOrThrow<T extends VehicleFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, VehicleFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findFirst<T extends VehicleFindFirstArgs>(args?: Prisma.SelectSubset<T, VehicleFindFirstArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    findFirstOrThrow<T extends VehicleFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, VehicleFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    findMany<T extends VehicleFindManyArgs>(args?: Prisma.SelectSubset<T, VehicleFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    create<T extends VehicleCreateArgs>(args: Prisma.SelectSubset<T, VehicleCreateArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    createMany<T extends VehicleCreateManyArgs>(args?: Prisma.SelectSubset<T, VehicleCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    createManyAndReturn<T extends VehicleCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, VehicleCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    delete<T extends VehicleDeleteArgs>(args: Prisma.SelectSubset<T, VehicleDeleteArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    update<T extends VehicleUpdateArgs>(args: Prisma.SelectSubset<T, VehicleUpdateArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    deleteMany<T extends VehicleDeleteManyArgs>(args?: Prisma.SelectSubset<T, VehicleDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateMany<T extends VehicleUpdateManyArgs>(args: Prisma.SelectSubset<T, VehicleUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    updateManyAndReturn<T extends VehicleUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, VehicleUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    upsert<T extends VehicleUpsertArgs>(args: Prisma.SelectSubset<T, VehicleUpsertArgs<ExtArgs>>): Prisma.Prisma__VehicleClient<runtime.Types.Result.GetResult<Prisma.$VehiclePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    count<T extends VehicleCountArgs>(args?: Prisma.Subset<T, VehicleCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], VehicleCountAggregateOutputType> : number>;
    aggregate<T extends VehicleAggregateArgs>(args: Prisma.Subset<T, VehicleAggregateArgs>): Prisma.PrismaPromise<GetVehicleAggregateType<T>>;
    groupBy<T extends VehicleGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: VehicleGroupByArgs['orderBy'];
    } : {
        orderBy?: VehicleGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, VehicleGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVehicleGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    readonly fields: VehicleFieldRefs;
}
export interface Prisma__VehicleClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
export interface VehicleFieldRefs {
    readonly id: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly imageUrl: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly plate: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly chassis: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly renavam: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly brand: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly model: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly manufactureYear: Prisma.FieldRef<"Vehicle", 'Int'>;
    readonly modelYear: Prisma.FieldRef<"Vehicle", 'Int'>;
    readonly color: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly fuel: Prisma.FieldRef<"Vehicle", 'FuelType'>;
    readonly type: Prisma.FieldRef<"Vehicle", 'VehicleType'>;
    readonly nickname: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly userId: Prisma.FieldRef<"Vehicle", 'String'>;
    readonly createdAt: Prisma.FieldRef<"Vehicle", 'DateTime'>;
    readonly updatedAt: Prisma.FieldRef<"Vehicle", 'DateTime'>;
}
export type VehicleFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleScalarFieldEnum | Prisma.VehicleScalarFieldEnum[];
};
export type VehicleFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleScalarFieldEnum | Prisma.VehicleScalarFieldEnum[];
};
export type VehicleFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where?: Prisma.VehicleWhereInput;
    orderBy?: Prisma.VehicleOrderByWithRelationInput | Prisma.VehicleOrderByWithRelationInput[];
    cursor?: Prisma.VehicleWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.VehicleScalarFieldEnum | Prisma.VehicleScalarFieldEnum[];
};
export type VehicleCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleCreateInput, Prisma.VehicleUncheckedCreateInput>;
};
export type VehicleCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.VehicleCreateManyInput | Prisma.VehicleCreateManyInput[];
    skipDuplicates?: boolean;
};
export type VehicleCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelectCreateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    data: Prisma.VehicleCreateManyInput | Prisma.VehicleCreateManyInput[];
    skipDuplicates?: boolean;
    include?: Prisma.VehicleIncludeCreateManyAndReturn<ExtArgs> | null;
};
export type VehicleUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleUpdateInput, Prisma.VehicleUncheckedUpdateInput>;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    data: Prisma.XOR<Prisma.VehicleUpdateManyMutationInput, Prisma.VehicleUncheckedUpdateManyInput>;
    where?: Prisma.VehicleWhereInput;
    limit?: number;
};
export type VehicleUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelectUpdateManyAndReturn<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    data: Prisma.XOR<Prisma.VehicleUpdateManyMutationInput, Prisma.VehicleUncheckedUpdateManyInput>;
    where?: Prisma.VehicleWhereInput;
    limit?: number;
    include?: Prisma.VehicleIncludeUpdateManyAndReturn<ExtArgs> | null;
};
export type VehicleUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
    create: Prisma.XOR<Prisma.VehicleCreateInput, Prisma.VehicleUncheckedCreateInput>;
    update: Prisma.XOR<Prisma.VehicleUpdateInput, Prisma.VehicleUncheckedUpdateInput>;
};
export type VehicleDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
    where: Prisma.VehicleWhereUniqueInput;
};
export type VehicleDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.VehicleWhereInput;
    limit?: number;
};
export type VehicleDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    select?: Prisma.VehicleSelect<ExtArgs> | null;
    omit?: Prisma.VehicleOmit<ExtArgs> | null;
    include?: Prisma.VehicleInclude<ExtArgs> | null;
};
