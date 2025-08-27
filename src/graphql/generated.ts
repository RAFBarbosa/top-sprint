import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  DateTime: any;
  Hex: any;
  Json: any;
  Long: any;
  RGBAHue: any;
  RGBATransparency: any;
  RichTextAST: any;
};

export type Aggregate = {
  __typename?: 'Aggregate';
  count: Scalars['Int'];
};

/** Asset system model */
export type Asset = Entity & Node & {
  __typename?: 'Asset';
  badgeDriver: Array<Driver>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  csvData: Array<Data>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String'];
  flagCalendar: Array<Calendar>;
  flagTrack: Array<Track>;
  footerLogoPartner: Array<Partner>;
  /** The file handle */
  handle: Scalars['String'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  imagePartner: Array<Partner>;
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>;
  photoBanner: Array<Banner>;
  photoDriver: Array<Driver>;
  photoTeam: Array<Team>;
  photosHallOfFame: Array<HallOfFame>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** The file size */
  size?: Maybe<Scalars['Float']>;
  slug?: Maybe<Scalars['String']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** Returns information you need to upload the asset. The type of upload is dependant on what you pass into asset creations as upload type. */
  upload?: Maybe<AssetUpload>;
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
  /** The file width */
  width?: Maybe<Scalars['Float']>;
};


/** Asset system model */
export type AssetBadgeDriverArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<DriverOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverWhereInput>;
};


/** Asset system model */
export type AssetCreatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetCsvDataArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<DataOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DataWhereInput>;
};


/** Asset system model */
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Asset system model */
export type AssetFlagCalendarArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<CalendarOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CalendarWhereInput>;
};


/** Asset system model */
export type AssetFlagTrackArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<TrackOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrackWhereInput>;
};


/** Asset system model */
export type AssetFooterLogoPartnerArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<PartnerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PartnerWhereInput>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetImagePartnerArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<PartnerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PartnerWhereInput>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: Array<Locale>;
};


/** Asset system model */
export type AssetPhotoBannerArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<BannerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BannerWhereInput>;
};


/** Asset system model */
export type AssetPhotoDriverArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<DriverOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverWhereInput>;
};


/** Asset system model */
export type AssetPhotoTeamArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<TeamOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamWhereInput>;
};


/** Asset system model */
export type AssetPhotosHallOfFameArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<HallOfFameOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HallOfFameWhereInput>;
};


/** Asset system model */
export type AssetPublishedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Asset system model */
export type AssetUpdatedAtArgs = {
  variation?: SystemDateTimeFieldVariation;
};


/** Asset system model */
export type AssetUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Asset system model */
export type AssetUrlArgs = {
  transformation?: InputMaybe<AssetTransformationInput>;
};

export type AssetConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: AssetWhereUniqueInput;
};

/** A connection to a list of items. */
export type AssetConnection = {
  __typename?: 'AssetConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<AssetEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type AssetCreateInput = {
  badgeDriver?: InputMaybe<DriverCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  csvData?: InputMaybe<DataCreateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']>;
  flagCalendar?: InputMaybe<CalendarCreateManyInlineInput>;
  flagTrack?: InputMaybe<TrackCreateManyInlineInput>;
  footerLogoPartner?: InputMaybe<PartnerCreateManyInlineInput>;
  imagePartner?: InputMaybe<PartnerCreateManyInlineInput>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  photoBanner?: InputMaybe<BannerCreateManyInlineInput>;
  photoDriver?: InputMaybe<DriverCreateManyInlineInput>;
  photoTeam?: InputMaybe<TeamCreateManyInlineInput>;
  photosHallOfFame?: InputMaybe<HallOfFameCreateManyInlineInput>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetCreateLocalizationInput = {
  /** Localization input */
  data: AssetCreateLocalizationDataInput;
  locale: Locale;
};

export type AssetCreateLocalizationsInput = {
  /** Create localizations for the newly-created document */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
};

export type AssetCreateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Create and connect multiple existing Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
};

export type AssetCreateOneInlineInput = {
  /** Connect one existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
};

/** An edge in a connection. */
export type AssetEdge = {
  __typename?: 'AssetEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Asset;
};

/** Identifies documents */
export type AssetManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  badgeDriver_every?: InputMaybe<DriverWhereInput>;
  badgeDriver_none?: InputMaybe<DriverWhereInput>;
  badgeDriver_some?: InputMaybe<DriverWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  csvData_every?: InputMaybe<DataWhereInput>;
  csvData_none?: InputMaybe<DataWhereInput>;
  csvData_some?: InputMaybe<DataWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  flagCalendar_every?: InputMaybe<CalendarWhereInput>;
  flagCalendar_none?: InputMaybe<CalendarWhereInput>;
  flagCalendar_some?: InputMaybe<CalendarWhereInput>;
  flagTrack_every?: InputMaybe<TrackWhereInput>;
  flagTrack_none?: InputMaybe<TrackWhereInput>;
  flagTrack_some?: InputMaybe<TrackWhereInput>;
  footerLogoPartner_every?: InputMaybe<PartnerWhereInput>;
  footerLogoPartner_none?: InputMaybe<PartnerWhereInput>;
  footerLogoPartner_some?: InputMaybe<PartnerWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  imagePartner_every?: InputMaybe<PartnerWhereInput>;
  imagePartner_none?: InputMaybe<PartnerWhereInput>;
  imagePartner_some?: InputMaybe<PartnerWhereInput>;
  photoBanner_every?: InputMaybe<BannerWhereInput>;
  photoBanner_none?: InputMaybe<BannerWhereInput>;
  photoBanner_some?: InputMaybe<BannerWhereInput>;
  photoDriver_every?: InputMaybe<DriverWhereInput>;
  photoDriver_none?: InputMaybe<DriverWhereInput>;
  photoDriver_some?: InputMaybe<DriverWhereInput>;
  photoTeam_every?: InputMaybe<TeamWhereInput>;
  photoTeam_none?: InputMaybe<TeamWhereInput>;
  photoTeam_some?: InputMaybe<TeamWhereInput>;
  photosHallOfFame_every?: InputMaybe<HallOfFameWhereInput>;
  photosHallOfFame_none?: InputMaybe<HallOfFameWhereInput>;
  photosHallOfFame_some?: InputMaybe<HallOfFameWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

export enum AssetOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  FileNameAsc = 'fileName_ASC',
  FileNameDesc = 'fileName_DESC',
  HandleAsc = 'handle_ASC',
  HandleDesc = 'handle_DESC',
  HeightAsc = 'height_ASC',
  HeightDesc = 'height_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  MimeTypeAsc = 'mimeType_ASC',
  MimeTypeDesc = 'mimeType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SizeAsc = 'size_ASC',
  SizeDesc = 'size_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  WidthAsc = 'width_ASC',
  WidthDesc = 'width_DESC'
}

/** Identifies documents */
export type AssetSingleRelationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetSingleRelationWhereInput>>;
  upload?: InputMaybe<AssetUploadWhereInput>;
};

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  badgeDriver?: InputMaybe<DriverUpdateManyInlineInput>;
  csvData?: InputMaybe<DataUpdateManyInlineInput>;
  fileName?: InputMaybe<Scalars['String']>;
  flagCalendar?: InputMaybe<CalendarUpdateManyInlineInput>;
  flagTrack?: InputMaybe<TrackUpdateManyInlineInput>;
  footerLogoPartner?: InputMaybe<PartnerUpdateManyInlineInput>;
  imagePartner?: InputMaybe<PartnerUpdateManyInlineInput>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  photoBanner?: InputMaybe<BannerUpdateManyInlineInput>;
  photoDriver?: InputMaybe<DriverUpdateManyInlineInput>;
  photoTeam?: InputMaybe<TeamUpdateManyInlineInput>;
  photosHallOfFame?: InputMaybe<HallOfFameUpdateManyInlineInput>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']>;
  slug?: InputMaybe<Scalars['String']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  /** Use this to define if its a reupload for the asset */
  reUpload?: InputMaybe<Scalars['Boolean']>;
  /** Optionally the system can upload a file for you, for that you need to provide a publicly accessible url */
  uploadUrl?: InputMaybe<Scalars['String']>;
};

export type AssetUpdateLocalizationInput = {
  data: AssetUpdateLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateLocalizationsInput = {
  /** Localizations to create */
  create?: InputMaybe<Array<AssetCreateLocalizationInput>>;
  /** Localizations to delete */
  delete?: InputMaybe<Array<Locale>>;
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateLocalizationInput>>;
  upsert?: InputMaybe<Array<AssetUpsertLocalizationInput>>;
};

export type AssetUpdateManyInlineInput = {
  /** Connect multiple existing Asset documents */
  connect?: InputMaybe<Array<AssetConnectInput>>;
  /** Create and connect multiple Asset documents */
  create?: InputMaybe<Array<AssetCreateInput>>;
  /** Delete multiple Asset documents */
  delete?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Disconnect multiple Asset documents */
  disconnect?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Asset documents */
  set?: InputMaybe<Array<AssetWhereUniqueInput>>;
  /** Update multiple Asset documents */
  update?: InputMaybe<Array<AssetUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Asset documents */
  upsert?: InputMaybe<Array<AssetUpsertWithNestedWhereUniqueInput>>;
};

export type AssetUpdateManyInput = {
  /** No fields in updateMany data input */
  _?: InputMaybe<Scalars['String']>;
};

export type AssetUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: AssetUpdateManyInput;
  /** Document search */
  where: AssetWhereInput;
};

export type AssetUpdateOneInlineInput = {
  /** Connect existing Asset document */
  connect?: InputMaybe<AssetWhereUniqueInput>;
  /** Create and connect one Asset document */
  create?: InputMaybe<AssetCreateInput>;
  /** Delete currently connected Asset document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Asset document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Asset document */
  update?: InputMaybe<AssetUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Asset document */
  upsert?: InputMaybe<AssetUpsertWithNestedWhereUniqueInput>;
};

export type AssetUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: AssetUpdateInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** Asset Upload */
export type AssetUpload = {
  __typename?: 'AssetUpload';
  /** Asset Upload Error */
  error?: Maybe<AssetUploadError>;
  /** Expiry Timestamp */
  expiresAt?: Maybe<Scalars['DateTime']>;
  /** Asset Request Data for upload */
  requestPostData?: Maybe<AssetUploadRequestPostData>;
  /** Asset Request Data for upload */
  status?: Maybe<AssetUploadStatus>;
};

/** Represents asset upload error */
export type AssetUploadError = {
  __typename?: 'AssetUploadError';
  code: Scalars['String'];
  message: Scalars['String'];
};

/** Asset Upload Request Post Data */
export type AssetUploadRequestPostData = {
  __typename?: 'AssetUploadRequestPostData';
  /** The algorithm to use in the form field. This value should be passed in the `X-Amz-Algorithm` form field. */
  algorithm: Scalars['String'];
  /** The credential to use in the form field. This value should be passed in the `X-Amz-Credential` form field. */
  credential: Scalars['String'];
  /** The date the request was signed, formatted as YYYYMMDDTHHMMSSZ. This value should be passed in the `X-Amz-Date` header. */
  date: Scalars['String'];
  /** The key to use in the form field. This value should be passed in the `Key` form field. */
  key: Scalars['String'];
  /** The policy to use in the form field. This value should be passed in the `Policy` form field. */
  policy: Scalars['String'];
  /** The security token to use in the form field. This field is optional only pass it if its not null. This value should be passed in the `X-Amz-Security-Token` form field if not null. */
  securityToken?: Maybe<Scalars['String']>;
  /** The signature to use in the form field. This value should be passed in the `X-Amz-Signature` form field. */
  signature: Scalars['String'];
  /** The URL to which the file should be uploaded with a POST request. */
  url: Scalars['String'];
};

/** System Asset Upload Status */
export enum AssetUploadStatus {
  AssetCreatePending = 'ASSET_CREATE_PENDING',
  AssetErrorUpload = 'ASSET_ERROR_UPLOAD',
  AssetUpdatePending = 'ASSET_UPDATE_PENDING',
  AssetUploadComplete = 'ASSET_UPLOAD_COMPLETE'
}

/** Identifies documents */
export type AssetUploadWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

/** Identifies documents */
export type AssetUploadWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetUploadWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetUploadWhereInput>>;
  expiresAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  expiresAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  expiresAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  expiresAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  expiresAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  expiresAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  expiresAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  expiresAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<AssetUploadStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<AssetUploadStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<AssetUploadStatus>>>;
};

export type AssetUpsertInput = {
  /** Create document if it didn't exist */
  create: AssetCreateInput;
  /** Update document if it exists */
  update: AssetUpdateInput;
};

export type AssetUpsertLocalizationInput = {
  create: AssetCreateLocalizationDataInput;
  locale: Locale;
  update: AssetUpdateLocalizationDataInput;
};

export type AssetUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: AssetUpsertInput;
  /** Unique document search */
  where: AssetWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type AssetWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type AssetWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  badgeDriver_every?: InputMaybe<DriverWhereInput>;
  badgeDriver_none?: InputMaybe<DriverWhereInput>;
  badgeDriver_some?: InputMaybe<DriverWhereInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  csvData_every?: InputMaybe<DataWhereInput>;
  csvData_none?: InputMaybe<DataWhereInput>;
  csvData_some?: InputMaybe<DataWhereInput>;
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
  fileName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  fileName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  fileName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  fileName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  fileName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  fileName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  fileName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  fileName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  fileName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  fileName_starts_with?: InputMaybe<Scalars['String']>;
  flagCalendar_every?: InputMaybe<CalendarWhereInput>;
  flagCalendar_none?: InputMaybe<CalendarWhereInput>;
  flagCalendar_some?: InputMaybe<CalendarWhereInput>;
  flagTrack_every?: InputMaybe<TrackWhereInput>;
  flagTrack_none?: InputMaybe<TrackWhereInput>;
  flagTrack_some?: InputMaybe<TrackWhereInput>;
  footerLogoPartner_every?: InputMaybe<PartnerWhereInput>;
  footerLogoPartner_none?: InputMaybe<PartnerWhereInput>;
  footerLogoPartner_some?: InputMaybe<PartnerWhereInput>;
  handle?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  handle_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  handle_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  handle_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  handle_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  handle_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  handle_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  handle_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  handle_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  handle_starts_with?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  height_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  height_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  height_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  height_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  height_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  height_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  height_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  imagePartner_every?: InputMaybe<PartnerWhereInput>;
  imagePartner_none?: InputMaybe<PartnerWhereInput>;
  imagePartner_some?: InputMaybe<PartnerWhereInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  mimeType_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  mimeType_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  mimeType_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  mimeType_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  mimeType_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  mimeType_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  mimeType_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  mimeType_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  mimeType_starts_with?: InputMaybe<Scalars['String']>;
  photoBanner_every?: InputMaybe<BannerWhereInput>;
  photoBanner_none?: InputMaybe<BannerWhereInput>;
  photoBanner_some?: InputMaybe<BannerWhereInput>;
  photoDriver_every?: InputMaybe<DriverWhereInput>;
  photoDriver_none?: InputMaybe<DriverWhereInput>;
  photoDriver_some?: InputMaybe<DriverWhereInput>;
  photoTeam_every?: InputMaybe<TeamWhereInput>;
  photoTeam_none?: InputMaybe<TeamWhereInput>;
  photoTeam_some?: InputMaybe<TeamWhereInput>;
  photosHallOfFame_every?: InputMaybe<HallOfFameWhereInput>;
  photosHallOfFame_none?: InputMaybe<HallOfFameWhereInput>;
  photosHallOfFame_some?: InputMaybe<HallOfFameWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  size?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  size_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  size_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  size_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  size_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  size_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  size_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  size_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  upload?: InputMaybe<AssetUploadWhereInput>;
  width?: InputMaybe<Scalars['Float']>;
  /** All values greater than the given value. */
  width_gt?: InputMaybe<Scalars['Float']>;
  /** All values greater than or equal the given value. */
  width_gte?: InputMaybe<Scalars['Float']>;
  /** All values that are contained in given list. */
  width_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
  /** All values less than the given value. */
  width_lt?: InputMaybe<Scalars['Float']>;
  /** All values less than or equal the given value. */
  width_lte?: InputMaybe<Scalars['Float']>;
  /** Any other value that exists and is not equal to the given value. */
  width_not?: InputMaybe<Scalars['Float']>;
  /** All values that are not contained in given list. */
  width_not_in?: InputMaybe<Array<InputMaybe<Scalars['Float']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type AssetWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<AssetWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<AssetWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<AssetWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Asset record uniquely */
export type AssetWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

export enum BadgeTitle {
  AntiZika = 'antiZika',
  MestreDaChuva = 'mestreDaChuva',
  ReiDaChuva = 'reiDaChuva'
}

export type Banner = Entity & Node & {
  __typename?: 'Banner';
  category: NewsCategory;
  content?: Maybe<Scalars['String']>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  deleted: Scalars['Boolean'];
  /** Get the document in other stages */
  documentInStages: Array<Banner>;
  /** List of Banner versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  photo?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type BannerCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type BannerDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type BannerHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type BannerPhotoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type BannerPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type BannerScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type BannerUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type BannerConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: BannerWhereUniqueInput;
};

/** A connection to a list of items. */
export type BannerConnection = {
  __typename?: 'BannerConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<BannerEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type BannerCreateInput = {
  category: NewsCategory;
  content?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  link?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type BannerCreateManyInlineInput = {
  /** Connect multiple existing Banner documents */
  connect?: InputMaybe<Array<BannerWhereUniqueInput>>;
  /** Create and connect multiple existing Banner documents */
  create?: InputMaybe<Array<BannerCreateInput>>;
};

export type BannerCreateOneInlineInput = {
  /** Connect one existing Banner document */
  connect?: InputMaybe<BannerWhereUniqueInput>;
  /** Create and connect one Banner document */
  create?: InputMaybe<BannerCreateInput>;
};

/** An edge in a connection. */
export type BannerEdge = {
  __typename?: 'BannerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Banner;
};

/** Identifies documents */
export type BannerManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<BannerWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<BannerWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<BannerWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<NewsCategory>;
  /** All values that are contained in given list. */
  category_in?: InputMaybe<Array<InputMaybe<NewsCategory>>>;
  /** Any other value that exists and is not equal to the given value. */
  category_not?: InputMaybe<NewsCategory>;
  /** All values that are not contained in given list. */
  category_not_in?: InputMaybe<Array<InputMaybe<NewsCategory>>>;
  content?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  content_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  content_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  content_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  content_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  content_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  content_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  content_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  content_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  content_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<BannerWhereStageInput>;
  documentInStages_none?: InputMaybe<BannerWhereStageInput>;
  documentInStages_some?: InputMaybe<BannerWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum BannerOrderByInput {
  CategoryAsc = 'category_ASC',
  CategoryDesc = 'category_DESC',
  ContentAsc = 'content_ASC',
  ContentDesc = 'content_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type BannerUpdateInput = {
  category?: InputMaybe<NewsCategory>;
  content?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']>;
};

export type BannerUpdateManyInlineInput = {
  /** Connect multiple existing Banner documents */
  connect?: InputMaybe<Array<BannerConnectInput>>;
  /** Create and connect multiple Banner documents */
  create?: InputMaybe<Array<BannerCreateInput>>;
  /** Delete multiple Banner documents */
  delete?: InputMaybe<Array<BannerWhereUniqueInput>>;
  /** Disconnect multiple Banner documents */
  disconnect?: InputMaybe<Array<BannerWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Banner documents */
  set?: InputMaybe<Array<BannerWhereUniqueInput>>;
  /** Update multiple Banner documents */
  update?: InputMaybe<Array<BannerUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Banner documents */
  upsert?: InputMaybe<Array<BannerUpsertWithNestedWhereUniqueInput>>;
};

export type BannerUpdateManyInput = {
  category?: InputMaybe<NewsCategory>;
  content?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type BannerUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: BannerUpdateManyInput;
  /** Document search */
  where: BannerWhereInput;
};

export type BannerUpdateOneInlineInput = {
  /** Connect existing Banner document */
  connect?: InputMaybe<BannerWhereUniqueInput>;
  /** Create and connect one Banner document */
  create?: InputMaybe<BannerCreateInput>;
  /** Delete currently connected Banner document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Banner document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Banner document */
  update?: InputMaybe<BannerUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Banner document */
  upsert?: InputMaybe<BannerUpsertWithNestedWhereUniqueInput>;
};

export type BannerUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: BannerUpdateInput;
  /** Unique document search */
  where: BannerWhereUniqueInput;
};

export type BannerUpsertInput = {
  /** Create document if it didn't exist */
  create: BannerCreateInput;
  /** Update document if it exists */
  update: BannerUpdateInput;
};

export type BannerUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: BannerUpsertInput;
  /** Unique document search */
  where: BannerWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type BannerWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type BannerWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<BannerWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<BannerWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<BannerWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  category?: InputMaybe<NewsCategory>;
  /** All values that are contained in given list. */
  category_in?: InputMaybe<Array<InputMaybe<NewsCategory>>>;
  /** Any other value that exists and is not equal to the given value. */
  category_not?: InputMaybe<NewsCategory>;
  /** All values that are not contained in given list. */
  category_not_in?: InputMaybe<Array<InputMaybe<NewsCategory>>>;
  content?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  content_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  content_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  content_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  content_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  content_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  content_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  content_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  content_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  content_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<BannerWhereStageInput>;
  documentInStages_none?: InputMaybe<BannerWhereStageInput>;
  documentInStages_some?: InputMaybe<BannerWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type BannerWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<BannerWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<BannerWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<BannerWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<BannerWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Banner record uniquely */
export type BannerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

export type Calendar = Entity & Node & {
  __typename?: 'Calendar';
  active: Scalars['Boolean'];
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  date?: Maybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Calendar>;
  flag?: Maybe<Asset>;
  grid: Grid;
  /** List of Calendar versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  round?: Maybe<Scalars['String']>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  track?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type CalendarCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CalendarDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type CalendarFlagArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type CalendarHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type CalendarPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type CalendarScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type CalendarUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type CalendarConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: CalendarWhereUniqueInput;
};

/** A connection to a list of items. */
export type CalendarConnection = {
  __typename?: 'CalendarConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<CalendarEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type CalendarCreateInput = {
  active: Scalars['Boolean'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date?: InputMaybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  description?: InputMaybe<Scalars['String']>;
  flag?: InputMaybe<AssetCreateOneInlineInput>;
  grid: Grid;
  link?: InputMaybe<Scalars['String']>;
  round?: InputMaybe<Scalars['String']>;
  track?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type CalendarCreateManyInlineInput = {
  /** Connect multiple existing Calendar documents */
  connect?: InputMaybe<Array<CalendarWhereUniqueInput>>;
  /** Create and connect multiple existing Calendar documents */
  create?: InputMaybe<Array<CalendarCreateInput>>;
};

export type CalendarCreateOneInlineInput = {
  /** Connect one existing Calendar document */
  connect?: InputMaybe<CalendarWhereUniqueInput>;
  /** Create and connect one Calendar document */
  create?: InputMaybe<CalendarCreateInput>;
};

/** An edge in a connection. */
export type CalendarEdge = {
  __typename?: 'CalendarEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Calendar;
};

/** Identifies documents */
export type CalendarManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CalendarWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CalendarWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CalendarWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  active?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  active_not?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<CalendarWhereStageInput>;
  documentInStages_none?: InputMaybe<CalendarWhereStageInput>;
  documentInStages_some?: InputMaybe<CalendarWhereStageInput>;
  flag?: InputMaybe<AssetWhereInput>;
  grid?: InputMaybe<Grid>;
  /** All values that are contained in given list. */
  grid_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  /** Any other value that exists and is not equal to the given value. */
  grid_not?: InputMaybe<Grid>;
  /** All values that are not contained in given list. */
  grid_not_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  round?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  round_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  round_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  round_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  round_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  round_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  round_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  round_starts_with?: InputMaybe<Scalars['String']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  track?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  track_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  track_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  track_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  track_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  track_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  track_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  track_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  track_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  track_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum CalendarOrderByInput {
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  GridAsc = 'grid_ASC',
  GridDesc = 'grid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RoundAsc = 'round_ASC',
  RoundDesc = 'round_DESC',
  TrackAsc = 'track_ASC',
  TrackDesc = 'track_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type CalendarUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  date?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  flag?: InputMaybe<AssetUpdateOneInlineInput>;
  grid?: InputMaybe<Grid>;
  link?: InputMaybe<Scalars['String']>;
  round?: InputMaybe<Scalars['String']>;
  track?: InputMaybe<Scalars['String']>;
};

export type CalendarUpdateManyInlineInput = {
  /** Connect multiple existing Calendar documents */
  connect?: InputMaybe<Array<CalendarConnectInput>>;
  /** Create and connect multiple Calendar documents */
  create?: InputMaybe<Array<CalendarCreateInput>>;
  /** Delete multiple Calendar documents */
  delete?: InputMaybe<Array<CalendarWhereUniqueInput>>;
  /** Disconnect multiple Calendar documents */
  disconnect?: InputMaybe<Array<CalendarWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Calendar documents */
  set?: InputMaybe<Array<CalendarWhereUniqueInput>>;
  /** Update multiple Calendar documents */
  update?: InputMaybe<Array<CalendarUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Calendar documents */
  upsert?: InputMaybe<Array<CalendarUpsertWithNestedWhereUniqueInput>>;
};

export type CalendarUpdateManyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  date?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  grid?: InputMaybe<Grid>;
  link?: InputMaybe<Scalars['String']>;
  round?: InputMaybe<Scalars['String']>;
  track?: InputMaybe<Scalars['String']>;
};

export type CalendarUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: CalendarUpdateManyInput;
  /** Document search */
  where: CalendarWhereInput;
};

export type CalendarUpdateOneInlineInput = {
  /** Connect existing Calendar document */
  connect?: InputMaybe<CalendarWhereUniqueInput>;
  /** Create and connect one Calendar document */
  create?: InputMaybe<CalendarCreateInput>;
  /** Delete currently connected Calendar document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Calendar document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Calendar document */
  update?: InputMaybe<CalendarUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Calendar document */
  upsert?: InputMaybe<CalendarUpsertWithNestedWhereUniqueInput>;
};

export type CalendarUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: CalendarUpdateInput;
  /** Unique document search */
  where: CalendarWhereUniqueInput;
};

export type CalendarUpsertInput = {
  /** Create document if it didn't exist */
  create: CalendarCreateInput;
  /** Update document if it exists */
  update: CalendarUpdateInput;
};

export type CalendarUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: CalendarUpsertInput;
  /** Unique document search */
  where: CalendarWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type CalendarWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type CalendarWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CalendarWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CalendarWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CalendarWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  active?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  active_not?: InputMaybe<Scalars['Boolean']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  documentInStages_every?: InputMaybe<CalendarWhereStageInput>;
  documentInStages_none?: InputMaybe<CalendarWhereStageInput>;
  documentInStages_some?: InputMaybe<CalendarWhereStageInput>;
  flag?: InputMaybe<AssetWhereInput>;
  grid?: InputMaybe<Grid>;
  /** All values that are contained in given list. */
  grid_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  /** Any other value that exists and is not equal to the given value. */
  grid_not?: InputMaybe<Grid>;
  /** All values that are not contained in given list. */
  grid_not_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  round?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  round_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  round_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  round_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  round_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  round_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  round_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  round_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  round_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  round_starts_with?: InputMaybe<Scalars['String']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  track?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  track_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  track_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  track_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  track_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  track_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  track_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  track_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  track_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  track_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type CalendarWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<CalendarWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<CalendarWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<CalendarWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<CalendarWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Calendar record uniquely */
export type CalendarWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum Class {
  ClassA = 'classA',
  ClassB = 'classB'
}

/** Representing a color value comprising of HEX, RGBA and css color values */
export type Color = {
  __typename?: 'Color';
  css: Scalars['String'];
  hex: Scalars['Hex'];
  rgba: Rgba;
};

/** Accepts either HEX or RGBA color value. At least one of hex or rgba value should be passed. If both are passed RGBA is used. */
export type ColorInput = {
  hex?: InputMaybe<Scalars['Hex']>;
  rgba?: InputMaybe<RgbaInput>;
};

export type ConnectPositionInput = {
  /** Connect document after specified document */
  after?: InputMaybe<Scalars['ID']>;
  /** Connect document before specified document */
  before?: InputMaybe<Scalars['ID']>;
  /** Connect document at last position */
  end?: InputMaybe<Scalars['Boolean']>;
  /** Connect document at first position */
  start?: InputMaybe<Scalars['Boolean']>;
};

export type Data = Entity & Node & {
  __typename?: 'Data';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  csv?: Maybe<Asset>;
  deleted: Scalars['Boolean'];
  /** Get the document in other stages */
  documentInStages: Array<Data>;
  grid: Grid;
  /** List of Data versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type DataCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DataCsvArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type DataDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type DataHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type DataPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DataScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type DataUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type DataConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: DataWhereUniqueInput;
};

/** A connection to a list of items. */
export type DataConnection = {
  __typename?: 'DataConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<DataEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type DataCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  csv?: InputMaybe<AssetCreateOneInlineInput>;
  deleted: Scalars['Boolean'];
  grid: Grid;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DataCreateManyInlineInput = {
  /** Connect multiple existing Data documents */
  connect?: InputMaybe<Array<DataWhereUniqueInput>>;
  /** Create and connect multiple existing Data documents */
  create?: InputMaybe<Array<DataCreateInput>>;
};

export type DataCreateOneInlineInput = {
  /** Connect one existing Data document */
  connect?: InputMaybe<DataWhereUniqueInput>;
  /** Create and connect one Data document */
  create?: InputMaybe<DataCreateInput>;
};

/** An edge in a connection. */
export type DataEdge = {
  __typename?: 'DataEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Data;
};

/** Identifies documents */
export type DataManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DataWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DataWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DataWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  csv?: InputMaybe<AssetWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<DataWhereStageInput>;
  documentInStages_none?: InputMaybe<DataWhereStageInput>;
  documentInStages_some?: InputMaybe<DataWhereStageInput>;
  grid?: InputMaybe<Grid>;
  /** All values that are contained in given list. */
  grid_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  /** Any other value that exists and is not equal to the given value. */
  grid_not?: InputMaybe<Grid>;
  /** All values that are not contained in given list. */
  grid_not_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum DataOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  GridAsc = 'grid_ASC',
  GridDesc = 'grid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type DataUpdateInput = {
  csv?: InputMaybe<AssetUpdateOneInlineInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
};

export type DataUpdateManyInlineInput = {
  /** Connect multiple existing Data documents */
  connect?: InputMaybe<Array<DataConnectInput>>;
  /** Create and connect multiple Data documents */
  create?: InputMaybe<Array<DataCreateInput>>;
  /** Delete multiple Data documents */
  delete?: InputMaybe<Array<DataWhereUniqueInput>>;
  /** Disconnect multiple Data documents */
  disconnect?: InputMaybe<Array<DataWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Data documents */
  set?: InputMaybe<Array<DataWhereUniqueInput>>;
  /** Update multiple Data documents */
  update?: InputMaybe<Array<DataUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Data documents */
  upsert?: InputMaybe<Array<DataUpsertWithNestedWhereUniqueInput>>;
};

export type DataUpdateManyInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
};

export type DataUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: DataUpdateManyInput;
  /** Document search */
  where: DataWhereInput;
};

export type DataUpdateOneInlineInput = {
  /** Connect existing Data document */
  connect?: InputMaybe<DataWhereUniqueInput>;
  /** Create and connect one Data document */
  create?: InputMaybe<DataCreateInput>;
  /** Delete currently connected Data document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Data document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Data document */
  update?: InputMaybe<DataUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Data document */
  upsert?: InputMaybe<DataUpsertWithNestedWhereUniqueInput>;
};

export type DataUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: DataUpdateInput;
  /** Unique document search */
  where: DataWhereUniqueInput;
};

export type DataUpsertInput = {
  /** Create document if it didn't exist */
  create: DataCreateInput;
  /** Update document if it exists */
  update: DataUpdateInput;
};

export type DataUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: DataUpsertInput;
  /** Unique document search */
  where: DataWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type DataWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type DataWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DataWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DataWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DataWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  csv?: InputMaybe<AssetWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<DataWhereStageInput>;
  documentInStages_none?: InputMaybe<DataWhereStageInput>;
  documentInStages_some?: InputMaybe<DataWhereStageInput>;
  grid?: InputMaybe<Grid>;
  /** All values that are contained in given list. */
  grid_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  /** Any other value that exists and is not equal to the given value. */
  grid_not?: InputMaybe<Grid>;
  /** All values that are not contained in given list. */
  grid_not_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type DataWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DataWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DataWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DataWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<DataWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Data record uniquely */
export type DataWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export enum DocumentFileTypes {
  /** Automatically selects the best format for the image based on the browser's capabilities. */
  AutoImage = 'autoImage',
  Avif = 'avif',
  Bmp = 'bmp',
  Gif = 'gif',
  Heic = 'heic',
  Jpg = 'jpg',
  Png = 'png',
  Svg = 'svg',
  Tiff = 'tiff',
  Webp = 'webp'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * JPG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * PNG:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * SVG:	autoImage, bmp, gif, jpg, png, webp, tiff
   * WEBP:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * GIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * TIFF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * AVIF:	autoImage, bmp, gif, jpg, png, webp, tiff, svg
   * PDF: 	autoImage, gif, jpg, png, webp, tiff
   *
   */
  format?: InputMaybe<DocumentFileTypes>;
};

/** Transformations for Documents */
export type DocumentTransformationInput = {
  /** Changes the output for the file. */
  output?: InputMaybe<DocumentOutputInput>;
};

export type DocumentVersion = {
  __typename?: 'DocumentVersion';
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['Json']>;
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type Driver = Entity & Node & {
  __typename?: 'Driver';
  badge: Array<Asset>;
  badgeTitle: Array<BadgeTitle>;
  city?: Maybe<Scalars['String']>;
  class?: Maybe<Class>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  deleted?: Maybe<Scalars['Boolean']>;
  /** Get the document in other stages */
  documentInStages: Array<Driver>;
  equipment?: Maybe<Scalars['String']>;
  fullTime?: Maybe<Scalars['Boolean']>;
  grid?: Maybe<Grid>;
  /** List of Driver versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  number?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  photo?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  stream?: Maybe<Scalars['String']>;
  team?: Maybe<Team>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type DriverBadgeArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type DriverCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DriverDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type DriverHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type DriverPhotoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type DriverPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DriverScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type DriverTeamArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DriverUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type DriverConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: DriverWhereUniqueInput;
};

/** A connection to a list of items. */
export type DriverConnection = {
  __typename?: 'DriverConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<DriverEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type DriverCreateInput = {
  badge?: InputMaybe<AssetCreateManyInlineInput>;
  badgeTitle?: InputMaybe<Array<BadgeTitle>>;
  city?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  equipment?: InputMaybe<Scalars['String']>;
  fullTime?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  stream?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<TeamCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DriverCreateManyInlineInput = {
  /** Connect multiple existing Driver documents */
  connect?: InputMaybe<Array<DriverWhereUniqueInput>>;
  /** Create and connect multiple existing Driver documents */
  create?: InputMaybe<Array<DriverCreateInput>>;
};

export type DriverCreateOneInlineInput = {
  /** Connect one existing Driver document */
  connect?: InputMaybe<DriverWhereUniqueInput>;
  /** Create and connect one Driver document */
  create?: InputMaybe<DriverCreateInput>;
};

/** An edge in a connection. */
export type DriverEdge = {
  __typename?: 'DriverEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Driver;
};

/** Identifies documents */
export type DriverManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DriverWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DriverWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DriverWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  badgeTitle?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array contains *all* items provided to the filter */
  badgeTitle_contains_all?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  badgeTitle_contains_none?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array contains at least one item provided to the filter */
  badgeTitle_contains_some?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  badgeTitle_not?: InputMaybe<Array<BadgeTitle>>;
  badge_every?: InputMaybe<AssetWhereInput>;
  badge_none?: InputMaybe<AssetWhereInput>;
  badge_some?: InputMaybe<AssetWhereInput>;
  city?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  city_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  city_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  city_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  city_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  city_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  city_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  city_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  city_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  city_starts_with?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  /** All values that are contained in given list. */
  class_in?: InputMaybe<Array<InputMaybe<Class>>>;
  /** Any other value that exists and is not equal to the given value. */
  class_not?: InputMaybe<Class>;
  /** All values that are not contained in given list. */
  class_not_in?: InputMaybe<Array<InputMaybe<Class>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<DriverWhereStageInput>;
  documentInStages_none?: InputMaybe<DriverWhereStageInput>;
  documentInStages_some?: InputMaybe<DriverWhereStageInput>;
  equipment?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  equipment_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  equipment_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  equipment_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  equipment_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  equipment_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  equipment_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  equipment_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  equipment_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  equipment_starts_with?: InputMaybe<Scalars['String']>;
  fullTime?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  fullTime_not?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
  /** All values that are contained in given list. */
  grid_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  /** Any other value that exists and is not equal to the given value. */
  grid_not?: InputMaybe<Grid>;
  /** All values that are not contained in given list. */
  grid_not_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  number_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  number_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  number_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  number_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  number_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  number_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  number_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  number_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  number_starts_with?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  phone_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  phone_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  phone_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  phone_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  phone_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  phone_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  phone_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  phone_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  phone_starts_with?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  stream?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  stream_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  stream_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  stream_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  stream_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  stream_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  stream_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  stream_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  stream_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  stream_starts_with?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<TeamWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum DriverOrderByInput {
  BadgeTitleAsc = 'badgeTitle_ASC',
  BadgeTitleDesc = 'badgeTitle_DESC',
  CityAsc = 'city_ASC',
  CityDesc = 'city_DESC',
  ClassAsc = 'class_ASC',
  ClassDesc = 'class_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  EquipmentAsc = 'equipment_ASC',
  EquipmentDesc = 'equipment_DESC',
  FullTimeAsc = 'fullTime_ASC',
  FullTimeDesc = 'fullTime_DESC',
  GridAsc = 'grid_ASC',
  GridDesc = 'grid_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  NumberAsc = 'number_ASC',
  NumberDesc = 'number_DESC',
  PhoneAsc = 'phone_ASC',
  PhoneDesc = 'phone_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StreamAsc = 'stream_ASC',
  StreamDesc = 'stream_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type DriverUpdateInput = {
  badge?: InputMaybe<AssetUpdateManyInlineInput>;
  badgeTitle?: InputMaybe<Array<BadgeTitle>>;
  city?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  equipment?: InputMaybe<Scalars['String']>;
  fullTime?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
  stream?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<TeamUpdateOneInlineInput>;
};

export type DriverUpdateManyInlineInput = {
  /** Connect multiple existing Driver documents */
  connect?: InputMaybe<Array<DriverConnectInput>>;
  /** Create and connect multiple Driver documents */
  create?: InputMaybe<Array<DriverCreateInput>>;
  /** Delete multiple Driver documents */
  delete?: InputMaybe<Array<DriverWhereUniqueInput>>;
  /** Disconnect multiple Driver documents */
  disconnect?: InputMaybe<Array<DriverWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Driver documents */
  set?: InputMaybe<Array<DriverWhereUniqueInput>>;
  /** Update multiple Driver documents */
  update?: InputMaybe<Array<DriverUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Driver documents */
  upsert?: InputMaybe<Array<DriverUpsertWithNestedWhereUniqueInput>>;
};

export type DriverUpdateManyInput = {
  badgeTitle?: InputMaybe<Array<BadgeTitle>>;
  city?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  equipment?: InputMaybe<Scalars['String']>;
  fullTime?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
  name?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  stream?: InputMaybe<Scalars['String']>;
};

export type DriverUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: DriverUpdateManyInput;
  /** Document search */
  where: DriverWhereInput;
};

export type DriverUpdateOneInlineInput = {
  /** Connect existing Driver document */
  connect?: InputMaybe<DriverWhereUniqueInput>;
  /** Create and connect one Driver document */
  create?: InputMaybe<DriverCreateInput>;
  /** Delete currently connected Driver document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Driver document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Driver document */
  update?: InputMaybe<DriverUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Driver document */
  upsert?: InputMaybe<DriverUpsertWithNestedWhereUniqueInput>;
};

export type DriverUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: DriverUpdateInput;
  /** Unique document search */
  where: DriverWhereUniqueInput;
};

export type DriverUpsertInput = {
  /** Create document if it didn't exist */
  create: DriverCreateInput;
  /** Update document if it exists */
  update: DriverUpdateInput;
};

export type DriverUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: DriverUpsertInput;
  /** Unique document search */
  where: DriverWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type DriverWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type DriverWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DriverWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DriverWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DriverWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  /** Matches if the field array contains *all* items provided to the filter and order does match */
  badgeTitle?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array contains *all* items provided to the filter */
  badgeTitle_contains_all?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array does not contain any of the items provided to the filter */
  badgeTitle_contains_none?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array contains at least one item provided to the filter */
  badgeTitle_contains_some?: InputMaybe<Array<BadgeTitle>>;
  /** Matches if the field array does not contains *all* items provided to the filter or order does not match */
  badgeTitle_not?: InputMaybe<Array<BadgeTitle>>;
  badge_every?: InputMaybe<AssetWhereInput>;
  badge_none?: InputMaybe<AssetWhereInput>;
  badge_some?: InputMaybe<AssetWhereInput>;
  city?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  city_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  city_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  city_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  city_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  city_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  city_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  city_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  city_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  city_starts_with?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  /** All values that are contained in given list. */
  class_in?: InputMaybe<Array<InputMaybe<Class>>>;
  /** Any other value that exists and is not equal to the given value. */
  class_not?: InputMaybe<Class>;
  /** All values that are not contained in given list. */
  class_not_in?: InputMaybe<Array<InputMaybe<Class>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<DriverWhereStageInput>;
  documentInStages_none?: InputMaybe<DriverWhereStageInput>;
  documentInStages_some?: InputMaybe<DriverWhereStageInput>;
  equipment?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  equipment_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  equipment_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  equipment_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  equipment_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  equipment_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  equipment_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  equipment_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  equipment_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  equipment_starts_with?: InputMaybe<Scalars['String']>;
  fullTime?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  fullTime_not?: InputMaybe<Scalars['Boolean']>;
  grid?: InputMaybe<Grid>;
  /** All values that are contained in given list. */
  grid_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  /** Any other value that exists and is not equal to the given value. */
  grid_not?: InputMaybe<Grid>;
  /** All values that are not contained in given list. */
  grid_not_in?: InputMaybe<Array<InputMaybe<Grid>>>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  number?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  number_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  number_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  number_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  number_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  number_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  number_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  number_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  number_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  number_starts_with?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  phone_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  phone_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  phone_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  phone_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  phone_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  phone_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  phone_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  phone_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  phone_starts_with?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  stream?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  stream_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  stream_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  stream_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  stream_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  stream_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  stream_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  stream_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  stream_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  stream_starts_with?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<TeamWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type DriverWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DriverWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DriverWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DriverWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<DriverWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Driver record uniquely */
export type DriverWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** An object with an ID */
export type Entity = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

/** This enumeration holds all typenames that implement the Entity interface. Components and models implement the Entity interface. */
export enum EntityTypeName {
  /** Asset system model */
  Asset = 'Asset',
  Banner = 'Banner',
  Calendar = 'Calendar',
  Data = 'Data',
  Driver = 'Driver',
  HallOfFame = 'HallOfFame',
  Partner = 'Partner',
  Round = 'Round',
  /** Scheduled Operation system model */
  ScheduledOperation = 'ScheduledOperation',
  /** Scheduled Release system model */
  ScheduledRelease = 'ScheduledRelease',
  Season = 'Season',
  Team = 'Team',
  Track = 'Track',
  /** User system model */
  User = 'User'
}

/** Allows to specify input to query models and components directly */
export type EntityWhereInput = {
  /** The ID of an object */
  id: Scalars['ID'];
  locale?: InputMaybe<Locale>;
  stage: Stage;
  /** The Type name of an object */
  typename: EntityTypeName;
};

export enum Grid {
  GridA = 'gridA',
  GridB = 'gridB',
  Inativo = 'inativo',
  Removido = 'removido',
  Reserva = 'reserva'
}

export type HallOfFame = Entity & Node & {
  __typename?: 'HallOfFame';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  deleted: Scalars['Boolean'];
  /** Get the document in other stages */
  documentInStages: Array<HallOfFame>;
  /** List of HallOfFame versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  photo: Array<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  season: Scalars['String'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type HallOfFameCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type HallOfFameDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type HallOfFameHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type HallOfFamePhotoArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetWhereInput>;
};


export type HallOfFamePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type HallOfFameScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type HallOfFameUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type HallOfFameConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: HallOfFameWhereUniqueInput;
};

/** A connection to a list of items. */
export type HallOfFameConnection = {
  __typename?: 'HallOfFameConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<HallOfFameEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type HallOfFameCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  photo: AssetCreateManyInlineInput;
  season: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type HallOfFameCreateManyInlineInput = {
  /** Connect multiple existing HallOfFame documents */
  connect?: InputMaybe<Array<HallOfFameWhereUniqueInput>>;
  /** Create and connect multiple existing HallOfFame documents */
  create?: InputMaybe<Array<HallOfFameCreateInput>>;
};

export type HallOfFameCreateOneInlineInput = {
  /** Connect one existing HallOfFame document */
  connect?: InputMaybe<HallOfFameWhereUniqueInput>;
  /** Create and connect one HallOfFame document */
  create?: InputMaybe<HallOfFameCreateInput>;
};

/** An edge in a connection. */
export type HallOfFameEdge = {
  __typename?: 'HallOfFameEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: HallOfFame;
};

/** Identifies documents */
export type HallOfFameManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<HallOfFameWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<HallOfFameWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<HallOfFameWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<HallOfFameWhereStageInput>;
  documentInStages_none?: InputMaybe<HallOfFameWhereStageInput>;
  documentInStages_some?: InputMaybe<HallOfFameWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  photo_every?: InputMaybe<AssetWhereInput>;
  photo_none?: InputMaybe<AssetWhereInput>;
  photo_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  season?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  season_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  season_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  season_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  season_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  season_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  season_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  season_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  season_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  season_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum HallOfFameOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SeasonAsc = 'season_ASC',
  SeasonDesc = 'season_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type HallOfFameUpdateInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  photo?: InputMaybe<AssetUpdateManyInlineInput>;
  season?: InputMaybe<Scalars['String']>;
};

export type HallOfFameUpdateManyInlineInput = {
  /** Connect multiple existing HallOfFame documents */
  connect?: InputMaybe<Array<HallOfFameConnectInput>>;
  /** Create and connect multiple HallOfFame documents */
  create?: InputMaybe<Array<HallOfFameCreateInput>>;
  /** Delete multiple HallOfFame documents */
  delete?: InputMaybe<Array<HallOfFameWhereUniqueInput>>;
  /** Disconnect multiple HallOfFame documents */
  disconnect?: InputMaybe<Array<HallOfFameWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing HallOfFame documents */
  set?: InputMaybe<Array<HallOfFameWhereUniqueInput>>;
  /** Update multiple HallOfFame documents */
  update?: InputMaybe<Array<HallOfFameUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple HallOfFame documents */
  upsert?: InputMaybe<Array<HallOfFameUpsertWithNestedWhereUniqueInput>>;
};

export type HallOfFameUpdateManyInput = {
  deleted?: InputMaybe<Scalars['Boolean']>;
  season?: InputMaybe<Scalars['String']>;
};

export type HallOfFameUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: HallOfFameUpdateManyInput;
  /** Document search */
  where: HallOfFameWhereInput;
};

export type HallOfFameUpdateOneInlineInput = {
  /** Connect existing HallOfFame document */
  connect?: InputMaybe<HallOfFameWhereUniqueInput>;
  /** Create and connect one HallOfFame document */
  create?: InputMaybe<HallOfFameCreateInput>;
  /** Delete currently connected HallOfFame document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected HallOfFame document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single HallOfFame document */
  update?: InputMaybe<HallOfFameUpdateWithNestedWhereUniqueInput>;
  /** Upsert single HallOfFame document */
  upsert?: InputMaybe<HallOfFameUpsertWithNestedWhereUniqueInput>;
};

export type HallOfFameUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: HallOfFameUpdateInput;
  /** Unique document search */
  where: HallOfFameWhereUniqueInput;
};

export type HallOfFameUpsertInput = {
  /** Create document if it didn't exist */
  create: HallOfFameCreateInput;
  /** Update document if it exists */
  update: HallOfFameUpdateInput;
};

export type HallOfFameUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: HallOfFameUpsertInput;
  /** Unique document search */
  where: HallOfFameWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type HallOfFameWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type HallOfFameWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<HallOfFameWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<HallOfFameWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<HallOfFameWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<HallOfFameWhereStageInput>;
  documentInStages_none?: InputMaybe<HallOfFameWhereStageInput>;
  documentInStages_some?: InputMaybe<HallOfFameWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  photo_every?: InputMaybe<AssetWhereInput>;
  photo_none?: InputMaybe<AssetWhereInput>;
  photo_some?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  season?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  season_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  season_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  season_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  season_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  season_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  season_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  season_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  season_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  season_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type HallOfFameWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<HallOfFameWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<HallOfFameWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<HallOfFameWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<HallOfFameWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References HallOfFame record uniquely */
export type HallOfFameWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type ImageBlurInput = {
  /** The amount of blurring to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int'];
};

/** Adds a border to the image. */
export type ImageBorderInput = {
  /** The background color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  background: Scalars['String'];
  /** The color of the border. The value must be a valid hex color code. Or one of the supported color names. */
  color: Scalars['String'];
  /** The width of the border in pixels. The value must be an integer from 1 to 1000. */
  width: Scalars['Int'];
};

export type ImageCompressInput = {
  /** Preserves the metadata of the image. */
  metadata: Scalars['Boolean'];
};

/**
 * Crops the image to the specified dimensions.
 * The starting points for X and Y coordinates are [0,0], aligning with the top-left corner of the image.
 * The width and height parameters determine the size in pixels of the cropping rectangle.
 * The output will include only the portion of the image within the designated crop area.
 */
export type ImageCropInput = {
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height: Scalars['Int'];
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width: Scalars['Int'];
  /** The x coordinate of the image. The value must be an integer from 0 to 10000. */
  x: Scalars['Int'];
  /** The y coordinate of the image. The value must be an integer from 0 to 10000. */
  y: Scalars['Int'];
};

export enum ImageFit {
  /** Resizes the image to fit within the specified parameters without distorting, cropping, or changing the aspect ratio. */
  Clip = 'clip',
  /** Resizes the image to fit the specified parameters exactly by removing any parts of the image that don't fit within the boundaries. */
  Crop = 'crop',
  /** Resizes the image to fit within the parameters, but as opposed to 'fit:clip' will not scale the image if the image is smaller than the output size. */
  Max = 'max',
  /** Resizes the image to fit the specified parameters exactly by scaling the image to the desired size. The aspect ratio of the image is not respected and the image can be distorted using this method. */
  Scale = 'scale'
}

export type ImageQualityInput = {
  /** The quality of the image. The value must be an integer from 1 to 100. */
  value: Scalars['Int'];
};

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']>;
};

export type ImageSharpenInput = {
  /** The amount of sharpening to apply to the image. The value must be an integer from 1 to 20. */
  amount: Scalars['Int'];
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Blurs the image. */
  blur?: InputMaybe<ImageBlurInput>;
  /** Adds a border to the image. */
  border?: InputMaybe<ImageBorderInput>;
  /** Compresses the image. */
  compress?: InputMaybe<ImageCompressInput>;
  /** Crops the image to the specified dimensions. */
  crop?: InputMaybe<ImageCropInput>;
  /**
   * Changes the quality of the image. The value must be an integer from 1 to 100.
   * Only supported for the following formats jpeg, jpg, webp, gif, heif, tiff, avif.
   */
  quality?: InputMaybe<ImageQualityInput>;
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
  /** Sharpens the image. */
  sharpen?: InputMaybe<ImageSharpenInput>;
};

/** Locale system enumeration */
export enum Locale {
  /** System locale */
  En = 'en'
}

/** Representing a geolocation point with latitude and longitude */
export type Location = {
  __typename?: 'Location';
  distance: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};


/** Representing a geolocation point with latitude and longitude */
export type LocationDistanceArgs = {
  from: LocationInput;
};

/** Input for a geolocation point with latitude and longitude */
export type LocationInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create an asset. Use the returned info to finish the creation process by uploading the asset. */
  createAsset?: Maybe<Asset>;
  /** Create one banner */
  createBanner?: Maybe<Banner>;
  /** Create one calendar */
  createCalendar?: Maybe<Calendar>;
  /** Create one data */
  createData?: Maybe<Data>;
  /** Create one driver */
  createDriver?: Maybe<Driver>;
  /** Create one hallOfFame */
  createHallOfFame?: Maybe<HallOfFame>;
  /** Create one partner */
  createPartner?: Maybe<Partner>;
  /** Create one round */
  createRound?: Maybe<Round>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one season */
  createSeason?: Maybe<Season>;
  /** Create one team */
  createTeam?: Maybe<Team>;
  /** Create one track */
  createTrack?: Maybe<Track>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /** Delete one banner from _all_ existing stages. Returns deleted document. */
  deleteBanner?: Maybe<Banner>;
  /** Delete one calendar from _all_ existing stages. Returns deleted document. */
  deleteCalendar?: Maybe<Calendar>;
  /** Delete one data from _all_ existing stages. Returns deleted document. */
  deleteData?: Maybe<Data>;
  /** Delete one driver from _all_ existing stages. Returns deleted document. */
  deleteDriver?: Maybe<Driver>;
  /** Delete one hallOfFame from _all_ existing stages. Returns deleted document. */
  deleteHallOfFame?: Maybe<HallOfFame>;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Banner documents
   * @deprecated Please use the new paginated many mutation (deleteManyBannersConnection)
   */
  deleteManyBanners: BatchPayload;
  /** Delete many Banner documents, return deleted documents */
  deleteManyBannersConnection: BannerConnection;
  /**
   * Delete many Calendar documents
   * @deprecated Please use the new paginated many mutation (deleteManyCalendarsConnection)
   */
  deleteManyCalendars: BatchPayload;
  /** Delete many Calendar documents, return deleted documents */
  deleteManyCalendarsConnection: CalendarConnection;
  /**
   * Delete many Data documents
   * @deprecated Please use the new paginated many mutation (deleteManyDatasConnection)
   */
  deleteManyDatas: BatchPayload;
  /** Delete many Data documents, return deleted documents */
  deleteManyDatasConnection: DataConnection;
  /**
   * Delete many Driver documents
   * @deprecated Please use the new paginated many mutation (deleteManyDriversConnection)
   */
  deleteManyDrivers: BatchPayload;
  /** Delete many Driver documents, return deleted documents */
  deleteManyDriversConnection: DriverConnection;
  /**
   * Delete many HallOfFame documents
   * @deprecated Please use the new paginated many mutation (deleteManyHallsOfFameConnection)
   */
  deleteManyHallsOfFame: BatchPayload;
  /** Delete many HallOfFame documents, return deleted documents */
  deleteManyHallsOfFameConnection: HallOfFameConnection;
  /**
   * Delete many Partner documents
   * @deprecated Please use the new paginated many mutation (deleteManyPartnersConnection)
   */
  deleteManyPartners: BatchPayload;
  /** Delete many Partner documents, return deleted documents */
  deleteManyPartnersConnection: PartnerConnection;
  /**
   * Delete many Round documents
   * @deprecated Please use the new paginated many mutation (deleteManyRoundsConnection)
   */
  deleteManyRounds: BatchPayload;
  /** Delete many Round documents, return deleted documents */
  deleteManyRoundsConnection: RoundConnection;
  /**
   * Delete many Season documents
   * @deprecated Please use the new paginated many mutation (deleteManySeasonsConnection)
   */
  deleteManySeasons: BatchPayload;
  /** Delete many Season documents, return deleted documents */
  deleteManySeasonsConnection: SeasonConnection;
  /**
   * Delete many Team documents
   * @deprecated Please use the new paginated many mutation (deleteManyTeamsConnection)
   */
  deleteManyTeams: BatchPayload;
  /** Delete many Team documents, return deleted documents */
  deleteManyTeamsConnection: TeamConnection;
  /**
   * Delete many Track documents
   * @deprecated Please use the new paginated many mutation (deleteManyTracksConnection)
   */
  deleteManyTracks: BatchPayload;
  /** Delete many Track documents, return deleted documents */
  deleteManyTracksConnection: TrackConnection;
  /** Delete one partner from _all_ existing stages. Returns deleted document. */
  deletePartner?: Maybe<Partner>;
  /** Delete one round from _all_ existing stages. Returns deleted document. */
  deleteRound?: Maybe<Round>;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one season from _all_ existing stages. Returns deleted document. */
  deleteSeason?: Maybe<Season>;
  /** Delete one team from _all_ existing stages. Returns deleted document. */
  deleteTeam?: Maybe<Team>;
  /** Delete one track from _all_ existing stages. Returns deleted document. */
  deleteTrack?: Maybe<Track>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /** Publish one banner */
  publishBanner?: Maybe<Banner>;
  /** Publish one calendar */
  publishCalendar?: Maybe<Calendar>;
  /** Publish one data */
  publishData?: Maybe<Data>;
  /** Publish one driver */
  publishDriver?: Maybe<Driver>;
  /** Publish one hallOfFame */
  publishHallOfFame?: Maybe<HallOfFame>;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Banner documents
   * @deprecated Please use the new paginated many mutation (publishManyBannersConnection)
   */
  publishManyBanners: BatchPayload;
  /** Publish many Banner documents */
  publishManyBannersConnection: BannerConnection;
  /**
   * Publish many Calendar documents
   * @deprecated Please use the new paginated many mutation (publishManyCalendarsConnection)
   */
  publishManyCalendars: BatchPayload;
  /** Publish many Calendar documents */
  publishManyCalendarsConnection: CalendarConnection;
  /**
   * Publish many Data documents
   * @deprecated Please use the new paginated many mutation (publishManyDatasConnection)
   */
  publishManyDatas: BatchPayload;
  /** Publish many Data documents */
  publishManyDatasConnection: DataConnection;
  /**
   * Publish many Driver documents
   * @deprecated Please use the new paginated many mutation (publishManyDriversConnection)
   */
  publishManyDrivers: BatchPayload;
  /** Publish many Driver documents */
  publishManyDriversConnection: DriverConnection;
  /**
   * Publish many HallOfFame documents
   * @deprecated Please use the new paginated many mutation (publishManyHallsOfFameConnection)
   */
  publishManyHallsOfFame: BatchPayload;
  /** Publish many HallOfFame documents */
  publishManyHallsOfFameConnection: HallOfFameConnection;
  /**
   * Publish many Partner documents
   * @deprecated Please use the new paginated many mutation (publishManyPartnersConnection)
   */
  publishManyPartners: BatchPayload;
  /** Publish many Partner documents */
  publishManyPartnersConnection: PartnerConnection;
  /**
   * Publish many Round documents
   * @deprecated Please use the new paginated many mutation (publishManyRoundsConnection)
   */
  publishManyRounds: BatchPayload;
  /** Publish many Round documents */
  publishManyRoundsConnection: RoundConnection;
  /**
   * Publish many Season documents
   * @deprecated Please use the new paginated many mutation (publishManySeasonsConnection)
   */
  publishManySeasons: BatchPayload;
  /** Publish many Season documents */
  publishManySeasonsConnection: SeasonConnection;
  /**
   * Publish many Team documents
   * @deprecated Please use the new paginated many mutation (publishManyTeamsConnection)
   */
  publishManyTeams: BatchPayload;
  /** Publish many Team documents */
  publishManyTeamsConnection: TeamConnection;
  /**
   * Publish many Track documents
   * @deprecated Please use the new paginated many mutation (publishManyTracksConnection)
   */
  publishManyTracks: BatchPayload;
  /** Publish many Track documents */
  publishManyTracksConnection: TrackConnection;
  /** Publish one partner */
  publishPartner?: Maybe<Partner>;
  /** Publish one round */
  publishRound?: Maybe<Round>;
  /** Publish one season */
  publishSeason?: Maybe<Season>;
  /** Publish one team */
  publishTeam?: Maybe<Team>;
  /** Publish one track */
  publishTrack?: Maybe<Track>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one banner */
  schedulePublishBanner?: Maybe<Banner>;
  /** Schedule to publish one calendar */
  schedulePublishCalendar?: Maybe<Calendar>;
  /** Schedule to publish one data */
  schedulePublishData?: Maybe<Data>;
  /** Schedule to publish one driver */
  schedulePublishDriver?: Maybe<Driver>;
  /** Schedule to publish one hallOfFame */
  schedulePublishHallOfFame?: Maybe<HallOfFame>;
  /** Schedule to publish one partner */
  schedulePublishPartner?: Maybe<Partner>;
  /** Schedule to publish one round */
  schedulePublishRound?: Maybe<Round>;
  /** Schedule to publish one season */
  schedulePublishSeason?: Maybe<Season>;
  /** Schedule to publish one team */
  schedulePublishTeam?: Maybe<Team>;
  /** Schedule to publish one track */
  schedulePublishTrack?: Maybe<Track>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one banner from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishBanner?: Maybe<Banner>;
  /** Unpublish one calendar from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishCalendar?: Maybe<Calendar>;
  /** Unpublish one data from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishData?: Maybe<Data>;
  /** Unpublish one driver from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishDriver?: Maybe<Driver>;
  /** Unpublish one hallOfFame from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishHallOfFame?: Maybe<HallOfFame>;
  /** Unpublish one partner from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishPartner?: Maybe<Partner>;
  /** Unpublish one round from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishRound?: Maybe<Round>;
  /** Unpublish one season from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishSeason?: Maybe<Season>;
  /** Unpublish one team from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTeam?: Maybe<Team>;
  /** Unpublish one track from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTrack?: Maybe<Track>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /** Unpublish one banner from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishBanner?: Maybe<Banner>;
  /** Unpublish one calendar from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishCalendar?: Maybe<Calendar>;
  /** Unpublish one data from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishData?: Maybe<Data>;
  /** Unpublish one driver from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishDriver?: Maybe<Driver>;
  /** Unpublish one hallOfFame from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishHallOfFame?: Maybe<HallOfFame>;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Banner documents
   * @deprecated Please use the new paginated many mutation (unpublishManyBannersConnection)
   */
  unpublishManyBanners: BatchPayload;
  /** Find many Banner documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyBannersConnection: BannerConnection;
  /**
   * Unpublish many Calendar documents
   * @deprecated Please use the new paginated many mutation (unpublishManyCalendarsConnection)
   */
  unpublishManyCalendars: BatchPayload;
  /** Find many Calendar documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyCalendarsConnection: CalendarConnection;
  /**
   * Unpublish many Data documents
   * @deprecated Please use the new paginated many mutation (unpublishManyDatasConnection)
   */
  unpublishManyDatas: BatchPayload;
  /** Find many Data documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyDatasConnection: DataConnection;
  /**
   * Unpublish many Driver documents
   * @deprecated Please use the new paginated many mutation (unpublishManyDriversConnection)
   */
  unpublishManyDrivers: BatchPayload;
  /** Find many Driver documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyDriversConnection: DriverConnection;
  /**
   * Unpublish many HallOfFame documents
   * @deprecated Please use the new paginated many mutation (unpublishManyHallsOfFameConnection)
   */
  unpublishManyHallsOfFame: BatchPayload;
  /** Find many HallOfFame documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyHallsOfFameConnection: HallOfFameConnection;
  /**
   * Unpublish many Partner documents
   * @deprecated Please use the new paginated many mutation (unpublishManyPartnersConnection)
   */
  unpublishManyPartners: BatchPayload;
  /** Find many Partner documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyPartnersConnection: PartnerConnection;
  /**
   * Unpublish many Round documents
   * @deprecated Please use the new paginated many mutation (unpublishManyRoundsConnection)
   */
  unpublishManyRounds: BatchPayload;
  /** Find many Round documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyRoundsConnection: RoundConnection;
  /**
   * Unpublish many Season documents
   * @deprecated Please use the new paginated many mutation (unpublishManySeasonsConnection)
   */
  unpublishManySeasons: BatchPayload;
  /** Find many Season documents that match criteria in specified stage and unpublish from target stages */
  unpublishManySeasonsConnection: SeasonConnection;
  /**
   * Unpublish many Team documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTeamsConnection)
   */
  unpublishManyTeams: BatchPayload;
  /** Find many Team documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTeamsConnection: TeamConnection;
  /**
   * Unpublish many Track documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTracksConnection)
   */
  unpublishManyTracks: BatchPayload;
  /** Find many Track documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTracksConnection: TrackConnection;
  /** Unpublish one partner from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishPartner?: Maybe<Partner>;
  /** Unpublish one round from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishRound?: Maybe<Round>;
  /** Unpublish one season from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishSeason?: Maybe<Season>;
  /** Unpublish one team from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTeam?: Maybe<Team>;
  /** Unpublish one track from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTrack?: Maybe<Track>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /** Update one banner */
  updateBanner?: Maybe<Banner>;
  /** Update one calendar */
  updateCalendar?: Maybe<Calendar>;
  /** Update one data */
  updateData?: Maybe<Data>;
  /** Update one driver */
  updateDriver?: Maybe<Driver>;
  /** Update one hallOfFame */
  updateHallOfFame?: Maybe<HallOfFame>;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many banners
   * @deprecated Please use the new paginated many mutation (updateManyBannersConnection)
   */
  updateManyBanners: BatchPayload;
  /** Update many Banner documents */
  updateManyBannersConnection: BannerConnection;
  /**
   * Update many calendars
   * @deprecated Please use the new paginated many mutation (updateManyCalendarsConnection)
   */
  updateManyCalendars: BatchPayload;
  /** Update many Calendar documents */
  updateManyCalendarsConnection: CalendarConnection;
  /**
   * Update many datas
   * @deprecated Please use the new paginated many mutation (updateManyDatasConnection)
   */
  updateManyDatas: BatchPayload;
  /** Update many Data documents */
  updateManyDatasConnection: DataConnection;
  /**
   * Update many drivers
   * @deprecated Please use the new paginated many mutation (updateManyDriversConnection)
   */
  updateManyDrivers: BatchPayload;
  /** Update many Driver documents */
  updateManyDriversConnection: DriverConnection;
  /**
   * Update many hallsOfFame
   * @deprecated Please use the new paginated many mutation (updateManyHallsOfFameConnection)
   */
  updateManyHallsOfFame: BatchPayload;
  /** Update many HallOfFame documents */
  updateManyHallsOfFameConnection: HallOfFameConnection;
  /**
   * Update many partners
   * @deprecated Please use the new paginated many mutation (updateManyPartnersConnection)
   */
  updateManyPartners: BatchPayload;
  /** Update many Partner documents */
  updateManyPartnersConnection: PartnerConnection;
  /**
   * Update many rounds
   * @deprecated Please use the new paginated many mutation (updateManyRoundsConnection)
   */
  updateManyRounds: BatchPayload;
  /** Update many Round documents */
  updateManyRoundsConnection: RoundConnection;
  /**
   * Update many seasons
   * @deprecated Please use the new paginated many mutation (updateManySeasonsConnection)
   */
  updateManySeasons: BatchPayload;
  /** Update many Season documents */
  updateManySeasonsConnection: SeasonConnection;
  /**
   * Update many teams
   * @deprecated Please use the new paginated many mutation (updateManyTeamsConnection)
   */
  updateManyTeams: BatchPayload;
  /** Update many Team documents */
  updateManyTeamsConnection: TeamConnection;
  /**
   * Update many tracks
   * @deprecated Please use the new paginated many mutation (updateManyTracksConnection)
   */
  updateManyTracks: BatchPayload;
  /** Update many Track documents */
  updateManyTracksConnection: TrackConnection;
  /** Update one partner */
  updatePartner?: Maybe<Partner>;
  /** Update one round */
  updateRound?: Maybe<Round>;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one season */
  updateSeason?: Maybe<Season>;
  /** Update one team */
  updateTeam?: Maybe<Team>;
  /** Update one track */
  updateTrack?: Maybe<Track>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one banner */
  upsertBanner?: Maybe<Banner>;
  /** Upsert one calendar */
  upsertCalendar?: Maybe<Calendar>;
  /** Upsert one data */
  upsertData?: Maybe<Data>;
  /** Upsert one driver */
  upsertDriver?: Maybe<Driver>;
  /** Upsert one hallOfFame */
  upsertHallOfFame?: Maybe<HallOfFame>;
  /** Upsert one partner */
  upsertPartner?: Maybe<Partner>;
  /** Upsert one round */
  upsertRound?: Maybe<Round>;
  /** Upsert one season */
  upsertSeason?: Maybe<Season>;
  /** Upsert one team */
  upsertTeam?: Maybe<Team>;
  /** Upsert one track */
  upsertTrack?: Maybe<Track>;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateBannerArgs = {
  data: BannerCreateInput;
};


export type MutationCreateCalendarArgs = {
  data: CalendarCreateInput;
};


export type MutationCreateDataArgs = {
  data: DataCreateInput;
};


export type MutationCreateDriverArgs = {
  data: DriverCreateInput;
};


export type MutationCreateHallOfFameArgs = {
  data: HallOfFameCreateInput;
};


export type MutationCreatePartnerArgs = {
  data: PartnerCreateInput;
};


export type MutationCreateRoundArgs = {
  data: RoundCreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationCreateSeasonArgs = {
  data: SeasonCreateInput;
};


export type MutationCreateTeamArgs = {
  data: TeamCreateInput;
};


export type MutationCreateTrackArgs = {
  data: TrackCreateInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteBannerArgs = {
  where: BannerWhereUniqueInput;
};


export type MutationDeleteCalendarArgs = {
  where: CalendarWhereUniqueInput;
};


export type MutationDeleteDataArgs = {
  where: DataWhereUniqueInput;
};


export type MutationDeleteDriverArgs = {
  where: DriverWhereUniqueInput;
};


export type MutationDeleteHallOfFameArgs = {
  where: HallOfFameWhereUniqueInput;
};


export type MutationDeleteManyAssetsArgs = {
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationDeleteManyBannersArgs = {
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationDeleteManyBannersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationDeleteManyCalendarsArgs = {
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationDeleteManyCalendarsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationDeleteManyDatasArgs = {
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationDeleteManyDatasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationDeleteManyDriversArgs = {
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationDeleteManyDriversConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationDeleteManyHallsOfFameArgs = {
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationDeleteManyHallsOfFameConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationDeleteManyPartnersArgs = {
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationDeleteManyPartnersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationDeleteManyRoundsArgs = {
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationDeleteManyRoundsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationDeleteManySeasonsArgs = {
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationDeleteManySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationDeleteManyTeamsArgs = {
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationDeleteManyTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationDeleteManyTracksArgs = {
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationDeleteManyTracksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationDeletePartnerArgs = {
  where: PartnerWhereUniqueInput;
};


export type MutationDeleteRoundArgs = {
  where: RoundWhereUniqueInput;
};


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationDeleteSeasonArgs = {
  where: SeasonWhereUniqueInput;
};


export type MutationDeleteTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type MutationDeleteTrackArgs = {
  where: TrackWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishBannerArgs = {
  to?: Array<Stage>;
  where: BannerWhereUniqueInput;
};


export type MutationPublishCalendarArgs = {
  to?: Array<Stage>;
  where: CalendarWhereUniqueInput;
};


export type MutationPublishDataArgs = {
  to?: Array<Stage>;
  where: DataWhereUniqueInput;
};


export type MutationPublishDriverArgs = {
  to?: Array<Stage>;
  where: DriverWhereUniqueInput;
};


export type MutationPublishHallOfFameArgs = {
  to?: Array<Stage>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationPublishManyAssetsArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<AssetManyWhereInput>;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishManyBannersArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationPublishManyBannersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationPublishManyCalendarsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationPublishManyCalendarsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationPublishManyDatasArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationPublishManyDatasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationPublishManyDriversArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationPublishManyDriversConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationPublishManyHallsOfFameArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationPublishManyHallsOfFameConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationPublishManyPartnersArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationPublishManyPartnersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationPublishManyRoundsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationPublishManyRoundsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationPublishManySeasonsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationPublishManySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationPublishManyTeamsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationPublishManyTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationPublishManyTracksArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationPublishManyTracksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationPublishPartnerArgs = {
  to?: Array<Stage>;
  where: PartnerWhereUniqueInput;
};


export type MutationPublishRoundArgs = {
  to?: Array<Stage>;
  where: RoundWhereUniqueInput;
};


export type MutationPublishSeasonArgs = {
  to?: Array<Stage>;
  where: SeasonWhereUniqueInput;
};


export type MutationPublishTeamArgs = {
  to?: Array<Stage>;
  where: TeamWhereUniqueInput;
};


export type MutationPublishTrackArgs = {
  to?: Array<Stage>;
  where: TrackWhereUniqueInput;
};


export type MutationSchedulePublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationSchedulePublishBannerArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: BannerWhereUniqueInput;
};


export type MutationSchedulePublishCalendarArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: CalendarWhereUniqueInput;
};


export type MutationSchedulePublishDataArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: DataWhereUniqueInput;
};


export type MutationSchedulePublishDriverArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: DriverWhereUniqueInput;
};


export type MutationSchedulePublishHallOfFameArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationSchedulePublishPartnerArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: PartnerWhereUniqueInput;
};


export type MutationSchedulePublishRoundArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: RoundWhereUniqueInput;
};


export type MutationSchedulePublishSeasonArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: SeasonWhereUniqueInput;
};


export type MutationSchedulePublishTeamArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TeamWhereUniqueInput;
};


export type MutationSchedulePublishTrackArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TrackWhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishBannerArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: BannerWhereUniqueInput;
};


export type MutationScheduleUnpublishCalendarArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: CalendarWhereUniqueInput;
};


export type MutationScheduleUnpublishDataArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: DataWhereUniqueInput;
};


export type MutationScheduleUnpublishDriverArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: DriverWhereUniqueInput;
};


export type MutationScheduleUnpublishHallOfFameArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationScheduleUnpublishPartnerArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: PartnerWhereUniqueInput;
};


export type MutationScheduleUnpublishRoundArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: RoundWhereUniqueInput;
};


export type MutationScheduleUnpublishSeasonArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: SeasonWhereUniqueInput;
};


export type MutationScheduleUnpublishTeamArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TeamWhereUniqueInput;
};


export type MutationScheduleUnpublishTrackArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TrackWhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishBannerArgs = {
  from?: Array<Stage>;
  where: BannerWhereUniqueInput;
};


export type MutationUnpublishCalendarArgs = {
  from?: Array<Stage>;
  where: CalendarWhereUniqueInput;
};


export type MutationUnpublishDataArgs = {
  from?: Array<Stage>;
  where: DataWhereUniqueInput;
};


export type MutationUnpublishDriverArgs = {
  from?: Array<Stage>;
  where: DriverWhereUniqueInput;
};


export type MutationUnpublishHallOfFameArgs = {
  from?: Array<Stage>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationUnpublishManyAssetsArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUnpublishManyBannersArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationUnpublishManyBannersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationUnpublishManyCalendarsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationUnpublishManyCalendarsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationUnpublishManyDatasArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationUnpublishManyDatasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationUnpublishManyDriversArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationUnpublishManyDriversConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationUnpublishManyHallsOfFameArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationUnpublishManyHallsOfFameConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationUnpublishManyPartnersArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationUnpublishManyPartnersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationUnpublishManyRoundsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationUnpublishManyRoundsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationUnpublishManySeasonsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationUnpublishManySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationUnpublishManyTeamsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationUnpublishManyTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationUnpublishManyTracksArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationUnpublishManyTracksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationUnpublishPartnerArgs = {
  from?: Array<Stage>;
  where: PartnerWhereUniqueInput;
};


export type MutationUnpublishRoundArgs = {
  from?: Array<Stage>;
  where: RoundWhereUniqueInput;
};


export type MutationUnpublishSeasonArgs = {
  from?: Array<Stage>;
  where: SeasonWhereUniqueInput;
};


export type MutationUnpublishTeamArgs = {
  from?: Array<Stage>;
  where: TeamWhereUniqueInput;
};


export type MutationUnpublishTrackArgs = {
  from?: Array<Stage>;
  where: TrackWhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateBannerArgs = {
  data: BannerUpdateInput;
  where: BannerWhereUniqueInput;
};


export type MutationUpdateCalendarArgs = {
  data: CalendarUpdateInput;
  where: CalendarWhereUniqueInput;
};


export type MutationUpdateDataArgs = {
  data: DataUpdateInput;
  where: DataWhereUniqueInput;
};


export type MutationUpdateDriverArgs = {
  data: DriverUpdateInput;
  where: DriverWhereUniqueInput;
};


export type MutationUpdateHallOfFameArgs = {
  data: HallOfFameUpdateInput;
  where: HallOfFameWhereUniqueInput;
};


export type MutationUpdateManyAssetsArgs = {
  data: AssetUpdateManyInput;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: AssetUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AssetManyWhereInput>;
};


export type MutationUpdateManyBannersArgs = {
  data: BannerUpdateManyInput;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationUpdateManyBannersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: BannerUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<BannerManyWhereInput>;
};


export type MutationUpdateManyCalendarsArgs = {
  data: CalendarUpdateManyInput;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationUpdateManyCalendarsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: CalendarUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<CalendarManyWhereInput>;
};


export type MutationUpdateManyDatasArgs = {
  data: DataUpdateManyInput;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationUpdateManyDatasConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: DataUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DataManyWhereInput>;
};


export type MutationUpdateManyDriversArgs = {
  data: DriverUpdateManyInput;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationUpdateManyDriversConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: DriverUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverManyWhereInput>;
};


export type MutationUpdateManyHallsOfFameArgs = {
  data: HallOfFameUpdateManyInput;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationUpdateManyHallsOfFameConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: HallOfFameUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<HallOfFameManyWhereInput>;
};


export type MutationUpdateManyPartnersArgs = {
  data: PartnerUpdateManyInput;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationUpdateManyPartnersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: PartnerUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<PartnerManyWhereInput>;
};


export type MutationUpdateManyRoundsArgs = {
  data: RoundUpdateManyInput;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationUpdateManyRoundsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: RoundUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoundManyWhereInput>;
};


export type MutationUpdateManySeasonsArgs = {
  data: SeasonUpdateManyInput;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationUpdateManySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: SeasonUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<SeasonManyWhereInput>;
};


export type MutationUpdateManyTeamsArgs = {
  data: TeamUpdateManyInput;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationUpdateManyTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: TeamUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamManyWhereInput>;
};


export type MutationUpdateManyTracksArgs = {
  data: TrackUpdateManyInput;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationUpdateManyTracksConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: TrackUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TrackManyWhereInput>;
};


export type MutationUpdatePartnerArgs = {
  data: PartnerUpdateInput;
  where: PartnerWhereUniqueInput;
};


export type MutationUpdateRoundArgs = {
  data: RoundUpdateInput;
  where: RoundWhereUniqueInput;
};


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpdateSeasonArgs = {
  data: SeasonUpdateInput;
  where: SeasonWhereUniqueInput;
};


export type MutationUpdateTeamArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};


export type MutationUpdateTrackArgs = {
  data: TrackUpdateInput;
  where: TrackWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertBannerArgs = {
  upsert: BannerUpsertInput;
  where: BannerWhereUniqueInput;
};


export type MutationUpsertCalendarArgs = {
  upsert: CalendarUpsertInput;
  where: CalendarWhereUniqueInput;
};


export type MutationUpsertDataArgs = {
  upsert: DataUpsertInput;
  where: DataWhereUniqueInput;
};


export type MutationUpsertDriverArgs = {
  upsert: DriverUpsertInput;
  where: DriverWhereUniqueInput;
};


export type MutationUpsertHallOfFameArgs = {
  upsert: HallOfFameUpsertInput;
  where: HallOfFameWhereUniqueInput;
};


export type MutationUpsertPartnerArgs = {
  upsert: PartnerUpsertInput;
  where: PartnerWhereUniqueInput;
};


export type MutationUpsertRoundArgs = {
  upsert: RoundUpsertInput;
  where: RoundWhereUniqueInput;
};


export type MutationUpsertSeasonArgs = {
  upsert: SeasonUpsertInput;
  where: SeasonWhereUniqueInput;
};


export type MutationUpsertTeamArgs = {
  upsert: TeamUpsertInput;
  where: TeamWhereUniqueInput;
};


export type MutationUpsertTrackArgs = {
  upsert: TrackUpsertInput;
  where: TrackWhereUniqueInput;
};

export enum NewsCategory {
  Destaque = 'destaque',
  Inativo = 'inativo',
  Secundario = 'secundario'
}

/** An object with an ID */
export type Node = {
  /** The id of the object. */
  id: Scalars['ID'];
  /** The Stage of an object */
  stage: Stage;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean'];
  /** Number of items in the current page. */
  pageSize?: Maybe<Scalars['Int']>;
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']>;
};

export type Partner = Entity & Node & {
  __typename?: 'Partner';
  active: Scalars['Boolean'];
  altText?: Maybe<Scalars['String']>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  deleted: Scalars['Boolean'];
  /** Get the document in other stages */
  documentInStages: Array<Partner>;
  footerLogo: Asset;
  /** List of Partner versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  image?: Maybe<Asset>;
  link?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type PartnerCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PartnerDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type PartnerFooterLogoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type PartnerHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type PartnerImageArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type PartnerPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type PartnerScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type PartnerUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type PartnerConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: PartnerWhereUniqueInput;
};

/** A connection to a list of items. */
export type PartnerConnection = {
  __typename?: 'PartnerConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<PartnerEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type PartnerCreateInput = {
  active: Scalars['Boolean'];
  altText?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  footerLogo: AssetCreateOneInlineInput;
  image?: InputMaybe<AssetCreateOneInlineInput>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type PartnerCreateManyInlineInput = {
  /** Connect multiple existing Partner documents */
  connect?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  /** Create and connect multiple existing Partner documents */
  create?: InputMaybe<Array<PartnerCreateInput>>;
};

export type PartnerCreateOneInlineInput = {
  /** Connect one existing Partner document */
  connect?: InputMaybe<PartnerWhereUniqueInput>;
  /** Create and connect one Partner document */
  create?: InputMaybe<PartnerCreateInput>;
};

/** An edge in a connection. */
export type PartnerEdge = {
  __typename?: 'PartnerEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Partner;
};

/** Identifies documents */
export type PartnerManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PartnerWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PartnerWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PartnerWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  active?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  active_not?: InputMaybe<Scalars['Boolean']>;
  altText?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  altText_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  altText_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  altText_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  altText_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  altText_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  altText_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  altText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  altText_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  altText_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<PartnerWhereStageInput>;
  documentInStages_none?: InputMaybe<PartnerWhereStageInput>;
  documentInStages_some?: InputMaybe<PartnerWhereStageInput>;
  footerLogo?: InputMaybe<AssetWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<AssetWhereInput>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum PartnerOrderByInput {
  ActiveAsc = 'active_ASC',
  ActiveDesc = 'active_DESC',
  AltTextAsc = 'altText_ASC',
  AltTextDesc = 'altText_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type PartnerUpdateInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  altText?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  footerLogo?: InputMaybe<AssetUpdateOneInlineInput>;
  image?: InputMaybe<AssetUpdateOneInlineInput>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PartnerUpdateManyInlineInput = {
  /** Connect multiple existing Partner documents */
  connect?: InputMaybe<Array<PartnerConnectInput>>;
  /** Create and connect multiple Partner documents */
  create?: InputMaybe<Array<PartnerCreateInput>>;
  /** Delete multiple Partner documents */
  delete?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  /** Disconnect multiple Partner documents */
  disconnect?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Partner documents */
  set?: InputMaybe<Array<PartnerWhereUniqueInput>>;
  /** Update multiple Partner documents */
  update?: InputMaybe<Array<PartnerUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Partner documents */
  upsert?: InputMaybe<Array<PartnerUpsertWithNestedWhereUniqueInput>>;
};

export type PartnerUpdateManyInput = {
  active?: InputMaybe<Scalars['Boolean']>;
  altText?: InputMaybe<Scalars['String']>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type PartnerUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: PartnerUpdateManyInput;
  /** Document search */
  where: PartnerWhereInput;
};

export type PartnerUpdateOneInlineInput = {
  /** Connect existing Partner document */
  connect?: InputMaybe<PartnerWhereUniqueInput>;
  /** Create and connect one Partner document */
  create?: InputMaybe<PartnerCreateInput>;
  /** Delete currently connected Partner document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Partner document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Partner document */
  update?: InputMaybe<PartnerUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Partner document */
  upsert?: InputMaybe<PartnerUpsertWithNestedWhereUniqueInput>;
};

export type PartnerUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: PartnerUpdateInput;
  /** Unique document search */
  where: PartnerWhereUniqueInput;
};

export type PartnerUpsertInput = {
  /** Create document if it didn't exist */
  create: PartnerCreateInput;
  /** Update document if it exists */
  update: PartnerUpdateInput;
};

export type PartnerUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: PartnerUpsertInput;
  /** Unique document search */
  where: PartnerWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type PartnerWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type PartnerWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PartnerWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PartnerWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PartnerWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  active?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  active_not?: InputMaybe<Scalars['Boolean']>;
  altText?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  altText_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  altText_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  altText_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  altText_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  altText_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  altText_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  altText_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  altText_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  altText_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<PartnerWhereStageInput>;
  documentInStages_none?: InputMaybe<PartnerWhereStageInput>;
  documentInStages_some?: InputMaybe<PartnerWhereStageInput>;
  footerLogo?: InputMaybe<AssetWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  image?: InputMaybe<AssetWhereInput>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type PartnerWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<PartnerWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<PartnerWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<PartnerWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<PartnerWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Partner record uniquely */
export type PartnerWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type PublishLocaleInput = {
  /** Locales to publish */
  locale: Locale;
  /** Stages to publish selected locales to */
  stages: Array<Stage>;
};

export type Query = {
  __typename?: 'Query';
  /** Retrieve a single asset */
  asset?: Maybe<Asset>;
  /** Retrieve document version */
  assetVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple assets */
  assets: Array<Asset>;
  /** Retrieve multiple assets using the Relay connection interface */
  assetsConnection: AssetConnection;
  /** Retrieve a single banner */
  banner?: Maybe<Banner>;
  /** Retrieve document version */
  bannerVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple banners */
  banners: Array<Banner>;
  /** Retrieve multiple banners using the Relay connection interface */
  bannersConnection: BannerConnection;
  /** Retrieve a single calendar */
  calendar?: Maybe<Calendar>;
  /** Retrieve document version */
  calendarVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple calendars */
  calendars: Array<Calendar>;
  /** Retrieve multiple calendars using the Relay connection interface */
  calendarsConnection: CalendarConnection;
  /** Retrieve a single data */
  data?: Maybe<Data>;
  /** Retrieve document version */
  dataVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple datas */
  datas: Array<Data>;
  /** Retrieve multiple datas using the Relay connection interface */
  datasConnection: DataConnection;
  /** Retrieve a single driver */
  driver?: Maybe<Driver>;
  /** Retrieve document version */
  driverVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple drivers */
  drivers: Array<Driver>;
  /** Retrieve multiple drivers using the Relay connection interface */
  driversConnection: DriverConnection;
  /** Fetches an object given its ID */
  entities?: Maybe<Array<Entity>>;
  /** Retrieve a single hallOfFame */
  hallOfFame?: Maybe<HallOfFame>;
  /** Retrieve document version */
  hallOfFameVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple hallsOfFame */
  hallsOfFame: Array<HallOfFame>;
  /** Retrieve multiple hallsOfFame using the Relay connection interface */
  hallsOfFameConnection: HallOfFameConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
  /** Retrieve a single partner */
  partner?: Maybe<Partner>;
  /** Retrieve document version */
  partnerVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple partners */
  partners: Array<Partner>;
  /** Retrieve multiple partners using the Relay connection interface */
  partnersConnection: PartnerConnection;
  /** Retrieve a single round */
  round?: Maybe<Round>;
  /** Retrieve document version */
  roundVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple rounds */
  rounds: Array<Round>;
  /** Retrieve multiple rounds using the Relay connection interface */
  roundsConnection: RoundConnection;
  /** Retrieve a single scheduledOperation */
  scheduledOperation?: Maybe<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations */
  scheduledOperations: Array<ScheduledOperation>;
  /** Retrieve multiple scheduledOperations using the Relay connection interface */
  scheduledOperationsConnection: ScheduledOperationConnection;
  /** Retrieve a single scheduledRelease */
  scheduledRelease?: Maybe<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases */
  scheduledReleases: Array<ScheduledRelease>;
  /** Retrieve multiple scheduledReleases using the Relay connection interface */
  scheduledReleasesConnection: ScheduledReleaseConnection;
  /** Retrieve a single season */
  season?: Maybe<Season>;
  /** Retrieve document version */
  seasonVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple seasons */
  seasons: Array<Season>;
  /** Retrieve multiple seasons using the Relay connection interface */
  seasonsConnection: SeasonConnection;
  /** Retrieve a single team */
  team?: Maybe<Team>;
  /** Retrieve document version */
  teamVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple teams */
  teams: Array<Team>;
  /** Retrieve multiple teams using the Relay connection interface */
  teamsConnection: TeamConnection;
  /** Retrieve a single track */
  track?: Maybe<Track>;
  /** Retrieve document version */
  trackVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple tracks */
  tracks: Array<Track>;
  /** Retrieve multiple tracks using the Relay connection interface */
  tracksConnection: TrackConnection;
  /** Retrieve a single user */
  user?: Maybe<User>;
  /** Retrieve multiple users */
  users: Array<User>;
  /** Retrieve multiple users using the Relay connection interface */
  usersConnection: UserConnection;
};


export type QueryAssetArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: AssetWhereUniqueInput;
};


export type QueryAssetVersionArgs = {
  where: VersionWhereInput;
};


export type QueryAssetsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryAssetsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<AssetOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<AssetWhereInput>;
};


export type QueryBannerArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: BannerWhereUniqueInput;
};


export type QueryBannerVersionArgs = {
  where: VersionWhereInput;
};


export type QueryBannersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<BannerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<BannerWhereInput>;
};


export type QueryBannersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<BannerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<BannerWhereInput>;
};


export type QueryCalendarArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: CalendarWhereUniqueInput;
};


export type QueryCalendarVersionArgs = {
  where: VersionWhereInput;
};


export type QueryCalendarsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CalendarOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CalendarWhereInput>;
};


export type QueryCalendarsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<CalendarOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<CalendarWhereInput>;
};


export type QueryDataArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: DataWhereUniqueInput;
};


export type QueryDataVersionArgs = {
  where: VersionWhereInput;
};


export type QueryDatasArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<DataOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<DataWhereInput>;
};


export type QueryDatasConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<DataOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<DataWhereInput>;
};


export type QueryDriverArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: DriverWhereUniqueInput;
};


export type QueryDriverVersionArgs = {
  where: VersionWhereInput;
};


export type QueryDriversArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<DriverOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<DriverWhereInput>;
};


export type QueryDriversConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<DriverOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<DriverWhereInput>;
};


export type QueryEntitiesArgs = {
  locales?: InputMaybe<Array<Locale>>;
  where: Array<EntityWhereInput>;
};


export type QueryHallOfFameArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: HallOfFameWhereUniqueInput;
};


export type QueryHallOfFameVersionArgs = {
  where: VersionWhereInput;
};


export type QueryHallsOfFameArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<HallOfFameOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<HallOfFameWhereInput>;
};


export type QueryHallsOfFameConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<HallOfFameOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<HallOfFameWhereInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: Array<Locale>;
  stage?: Stage;
};


export type QueryPartnerArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: PartnerWhereUniqueInput;
};


export type QueryPartnerVersionArgs = {
  where: VersionWhereInput;
};


export type QueryPartnersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PartnerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<PartnerWhereInput>;
};


export type QueryPartnersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<PartnerOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<PartnerWhereInput>;
};


export type QueryRoundArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: RoundWhereUniqueInput;
};


export type QueryRoundVersionArgs = {
  where: VersionWhereInput;
};


export type QueryRoundsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<RoundOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<RoundWhereInput>;
};


export type QueryRoundsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<RoundOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<RoundWhereInput>;
};


export type QueryScheduledOperationArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledOperationWhereUniqueInput;
};


export type QueryScheduledOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledOperationsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type QueryScheduledReleaseArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ScheduledReleaseWhereUniqueInput;
};


export type QueryScheduledReleasesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QueryScheduledReleasesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ScheduledReleaseOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ScheduledReleaseWhereInput>;
};


export type QuerySeasonArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: SeasonWhereUniqueInput;
};


export type QuerySeasonVersionArgs = {
  where: VersionWhereInput;
};


export type QuerySeasonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SeasonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<SeasonWhereInput>;
};


export type QuerySeasonsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<SeasonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<SeasonWhereInput>;
};


export type QueryTeamArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TeamWhereUniqueInput;
};


export type QueryTeamVersionArgs = {
  where: VersionWhereInput;
};


export type QueryTeamsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TeamOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TeamWhereInput>;
};


export type QueryTeamsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TeamOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TeamWhereInput>;
};


export type QueryTrackArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TrackWhereUniqueInput;
};


export type QueryTrackVersionArgs = {
  where: VersionWhereInput;
};


export type QueryTracksArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TrackOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TrackWhereInput>;
};


export type QueryTracksConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TrackOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TrackWhereInput>;
};


export type QueryUserArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: UserWhereUniqueInput;
};


export type QueryUsersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};


export type QueryUsersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<UserOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<UserWhereInput>;
};

/** Representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type Rgba = {
  __typename?: 'RGBA';
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Input type representing a RGBA color value: https://developer.mozilla.org/en-US/docs/Web/CSS/color_value#rgb()_and_rgba() */
export type RgbaInput = {
  a: Scalars['RGBATransparency'];
  b: Scalars['RGBAHue'];
  g: Scalars['RGBAHue'];
  r: Scalars['RGBAHue'];
};

/** Custom type representing a rich text value comprising of raw rich text ast, html, markdown and text values */
export type RichText = {
  __typename?: 'RichText';
  /** Returns HTMl representation */
  html: Scalars['String'];
  /** Returns Markdown representation */
  markdown: Scalars['String'];
  /** Returns AST representation */
  raw: Scalars['RichTextAST'];
  /** Returns plain-text contents of RichText */
  text: Scalars['String'];
};

export type Round = Entity & Node & {
  __typename?: 'Round';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  date?: Maybe<Scalars['DateTime']>;
  /** Get the document in other stages */
  documentInStages: Array<Round>;
  /** List of Round versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  link?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  raceWinner?: Maybe<Scalars['String']>;
  results?: Maybe<Scalars['Json']>;
  scheduledIn: Array<ScheduledOperation>;
  season?: Maybe<Season>;
  /** System stage field */
  stage: Stage;
  track?: Maybe<Track>;
  /** Não deve ser usado no site. Quando acessarmos os detalhes de uma temporada, serão exibidas as etapas, e, em cada etapa, aparecerão o nome da etapa e este campo. */
  trackName?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type RoundCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type RoundDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type RoundHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type RoundPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type RoundScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type RoundSeasonArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type RoundTrackArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type RoundUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type RoundConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: RoundWhereUniqueInput;
};

/** A connection to a list of items. */
export type RoundConnection = {
  __typename?: 'RoundConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<RoundEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type RoundCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  date?: InputMaybe<Scalars['DateTime']>;
  link?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  raceWinner?: InputMaybe<Scalars['String']>;
  results?: InputMaybe<Scalars['Json']>;
  season?: InputMaybe<SeasonCreateOneInlineInput>;
  track?: InputMaybe<TrackCreateOneInlineInput>;
  trackName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type RoundCreateManyInlineInput = {
  /** Connect multiple existing Round documents */
  connect?: InputMaybe<Array<RoundWhereUniqueInput>>;
  /** Create and connect multiple existing Round documents */
  create?: InputMaybe<Array<RoundCreateInput>>;
};

export type RoundCreateOneInlineInput = {
  /** Connect one existing Round document */
  connect?: InputMaybe<RoundWhereUniqueInput>;
  /** Create and connect one Round document */
  create?: InputMaybe<RoundCreateInput>;
};

/** An edge in a connection. */
export type RoundEdge = {
  __typename?: 'RoundEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Round;
};

/** Identifies documents */
export type RoundManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<RoundWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<RoundWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<RoundWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<RoundWhereStageInput>;
  documentInStages_none?: InputMaybe<RoundWhereStageInput>;
  documentInStages_some?: InputMaybe<RoundWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  raceWinner?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  raceWinner_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  raceWinner_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  raceWinner_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  raceWinner_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  raceWinner_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  raceWinner_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  raceWinner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  raceWinner_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  raceWinner_starts_with?: InputMaybe<Scalars['String']>;
  /** All values containing the given json path. */
  results_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  results_value_recursive?: InputMaybe<Scalars['Json']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  season?: InputMaybe<SeasonWhereInput>;
  track?: InputMaybe<TrackWhereInput>;
  trackName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  trackName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  trackName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  trackName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  trackName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  trackName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  trackName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  trackName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  trackName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  trackName_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum RoundOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DateAsc = 'date_ASC',
  DateDesc = 'date_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LinkAsc = 'link_ASC',
  LinkDesc = 'link_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RaceWinnerAsc = 'raceWinner_ASC',
  RaceWinnerDesc = 'raceWinner_DESC',
  TrackNameAsc = 'trackName_ASC',
  TrackNameDesc = 'trackName_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type RoundUpdateInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  raceWinner?: InputMaybe<Scalars['String']>;
  results?: InputMaybe<Scalars['Json']>;
  season?: InputMaybe<SeasonUpdateOneInlineInput>;
  track?: InputMaybe<TrackUpdateOneInlineInput>;
  trackName?: InputMaybe<Scalars['String']>;
};

export type RoundUpdateManyInlineInput = {
  /** Connect multiple existing Round documents */
  connect?: InputMaybe<Array<RoundConnectInput>>;
  /** Create and connect multiple Round documents */
  create?: InputMaybe<Array<RoundCreateInput>>;
  /** Delete multiple Round documents */
  delete?: InputMaybe<Array<RoundWhereUniqueInput>>;
  /** Disconnect multiple Round documents */
  disconnect?: InputMaybe<Array<RoundWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Round documents */
  set?: InputMaybe<Array<RoundWhereUniqueInput>>;
  /** Update multiple Round documents */
  update?: InputMaybe<Array<RoundUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Round documents */
  upsert?: InputMaybe<Array<RoundUpsertWithNestedWhereUniqueInput>>;
};

export type RoundUpdateManyInput = {
  date?: InputMaybe<Scalars['DateTime']>;
  link?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  raceWinner?: InputMaybe<Scalars['String']>;
  results?: InputMaybe<Scalars['Json']>;
  trackName?: InputMaybe<Scalars['String']>;
};

export type RoundUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: RoundUpdateManyInput;
  /** Document search */
  where: RoundWhereInput;
};

export type RoundUpdateOneInlineInput = {
  /** Connect existing Round document */
  connect?: InputMaybe<RoundWhereUniqueInput>;
  /** Create and connect one Round document */
  create?: InputMaybe<RoundCreateInput>;
  /** Delete currently connected Round document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Round document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Round document */
  update?: InputMaybe<RoundUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Round document */
  upsert?: InputMaybe<RoundUpsertWithNestedWhereUniqueInput>;
};

export type RoundUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: RoundUpdateInput;
  /** Unique document search */
  where: RoundWhereUniqueInput;
};

export type RoundUpsertInput = {
  /** Create document if it didn't exist */
  create: RoundCreateInput;
  /** Update document if it exists */
  update: RoundUpdateInput;
};

export type RoundUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: RoundUpsertInput;
  /** Unique document search */
  where: RoundWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type RoundWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type RoundWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<RoundWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<RoundWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<RoundWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  date?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  date_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  date_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  date_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  date_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  date_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  date_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  date_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<RoundWhereStageInput>;
  documentInStages_none?: InputMaybe<RoundWhereStageInput>;
  documentInStages_some?: InputMaybe<RoundWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  link?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  link_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  link_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  link_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  link_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  link_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  link_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  link_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  link_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  link_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  raceWinner?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  raceWinner_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  raceWinner_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  raceWinner_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  raceWinner_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  raceWinner_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  raceWinner_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  raceWinner_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  raceWinner_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  raceWinner_starts_with?: InputMaybe<Scalars['String']>;
  /** All values containing the given json path. */
  results_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  results_value_recursive?: InputMaybe<Scalars['Json']>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  season?: InputMaybe<SeasonWhereInput>;
  track?: InputMaybe<TrackWhereInput>;
  trackName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  trackName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  trackName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  trackName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  trackName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  trackName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  trackName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  trackName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  trackName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  trackName_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type RoundWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<RoundWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<RoundWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<RoundWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<RoundWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Round record uniquely */
export type RoundWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Operation system model */
export type ScheduledOperation = Entity & Node & {
  __typename?: 'ScheduledOperation';
  affectedDocuments: Array<ScheduledOperationAffectedDocument>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Operation description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledOperation>;
  /** Operation error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Raw operation payload including all details, this field is subject to change */
  rawPayload: Scalars['Json'];
  /** The release this operation is scheduled for */
  release?: Maybe<ScheduledRelease>;
  /** System stage field */
  stage: Stage;
  /** operation Status */
  status: ScheduledOperationStatus;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Operation system model */
export type ScheduledOperationAffectedDocumentsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
};


/** Scheduled Operation system model */
export type ScheduledOperationCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Scheduled Operation system model */
export type ScheduledOperationPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationReleaseArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Operation system model */
export type ScheduledOperationUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledOperationAffectedDocument = Asset | Banner | Calendar | Data | Driver | HallOfFame | Partner | Round | Season | Team | Track;

export type ScheduledOperationConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledOperationWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledOperationConnection = {
  __typename?: 'ScheduledOperationConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledOperationEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledOperationCreateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationCreateOneInlineInput = {
  /** Connect one existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
};

/** An edge in a connection. */
export type ScheduledOperationEdge = {
  __typename?: 'ScheduledOperationEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledOperation;
};

/** Identifies documents */
export type ScheduledOperationManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledOperationOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Operation Status */
export enum ScheduledOperationStatus {
  Canceled = 'CANCELED',
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledOperationUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledOperation documents */
  connect?: InputMaybe<Array<ScheduledOperationConnectInput>>;
  /** Disconnect multiple ScheduledOperation documents */
  disconnect?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledOperation documents */
  set?: InputMaybe<Array<ScheduledOperationWhereUniqueInput>>;
};

export type ScheduledOperationUpdateOneInlineInput = {
  /** Connect existing ScheduledOperation document */
  connect?: InputMaybe<ScheduledOperationWhereUniqueInput>;
  /** Disconnect currently connected ScheduledOperation document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ScheduledOperationWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledOperationWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  /** All values containing the given json path. */
  rawPayload_json_path_exists?: InputMaybe<Scalars['String']>;
  /**
   * Recursively tries to find the provided JSON scalar value inside the field.
   * It does use an exact match when comparing values.
   * If you pass `null` as value the filter will be ignored.
   * Note: This filter fails if you try to look for a non scalar JSON value!
   */
  rawPayload_value_recursive?: InputMaybe<Scalars['Json']>;
  release?: InputMaybe<ScheduledReleaseWhereInput>;
  status?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledOperationStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledOperationStatus>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledOperation record uniquely */
export type ScheduledOperationWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

/** Scheduled Release system model */
export type ScheduledRelease = Entity & Node & {
  __typename?: 'ScheduledRelease';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Release description */
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<ScheduledRelease>;
  /** Release error message */
  errorMessage?: Maybe<Scalars['String']>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Whether scheduled release should be run */
  isActive: Scalars['Boolean'];
  /** Whether scheduled release is implicit */
  isImplicit: Scalars['Boolean'];
  /** Operations to run with this release */
  operations: Array<ScheduledOperation>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  /** Release date and time */
  releaseAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** Release Status */
  status: ScheduledReleaseStatus;
  /** Release Title */
  title?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


/** Scheduled Release system model */
export type ScheduledReleaseCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Scheduled Release system model */
export type ScheduledReleaseOperationsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<ScheduledOperationOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


/** Scheduled Release system model */
export type ScheduledReleasePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


/** Scheduled Release system model */
export type ScheduledReleaseUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ScheduledReleaseConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ScheduledReleaseWhereUniqueInput;
};

/** A connection to a list of items. */
export type ScheduledReleaseConnection = {
  __typename?: 'ScheduledReleaseConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ScheduledReleaseEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ScheduledReleaseCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type ScheduledReleaseCreateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Create and connect multiple existing ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
};

export type ScheduledReleaseCreateOneInlineInput = {
  /** Connect one existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
};

/** An edge in a connection. */
export type ScheduledReleaseEdge = {
  __typename?: 'ScheduledReleaseEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: ScheduledRelease;
};

/** Identifies documents */
export type ScheduledReleaseManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum ScheduledReleaseOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  ErrorMessageAsc = 'errorMessage_ASC',
  ErrorMessageDesc = 'errorMessage_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  IsImplicitAsc = 'isImplicit_ASC',
  IsImplicitDesc = 'isImplicit_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  ReleaseAtAsc = 'releaseAt_ASC',
  ReleaseAtDesc = 'releaseAt_DESC',
  StatusAsc = 'status_ASC',
  StatusDesc = 'status_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

/** System Scheduled Release Status */
export enum ScheduledReleaseStatus {
  Completed = 'COMPLETED',
  Failed = 'FAILED',
  InProgress = 'IN_PROGRESS',
  Pending = 'PENDING'
}

export type ScheduledReleaseUpdateInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyInlineInput = {
  /** Connect multiple existing ScheduledRelease documents */
  connect?: InputMaybe<Array<ScheduledReleaseConnectInput>>;
  /** Create and connect multiple ScheduledRelease documents */
  create?: InputMaybe<Array<ScheduledReleaseCreateInput>>;
  /** Delete multiple ScheduledRelease documents */
  delete?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Disconnect multiple ScheduledRelease documents */
  disconnect?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing ScheduledRelease documents */
  set?: InputMaybe<Array<ScheduledReleaseWhereUniqueInput>>;
  /** Update multiple ScheduledRelease documents */
  update?: InputMaybe<Array<ScheduledReleaseUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple ScheduledRelease documents */
  upsert?: InputMaybe<Array<ScheduledReleaseUpsertWithNestedWhereUniqueInput>>;
};

export type ScheduledReleaseUpdateManyInput = {
  description?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  title?: InputMaybe<Scalars['String']>;
};

export type ScheduledReleaseUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ScheduledReleaseUpdateManyInput;
  /** Document search */
  where: ScheduledReleaseWhereInput;
};

export type ScheduledReleaseUpdateOneInlineInput = {
  /** Connect existing ScheduledRelease document */
  connect?: InputMaybe<ScheduledReleaseWhereUniqueInput>;
  /** Create and connect one ScheduledRelease document */
  create?: InputMaybe<ScheduledReleaseCreateInput>;
  /** Delete currently connected ScheduledRelease document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected ScheduledRelease document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single ScheduledRelease document */
  update?: InputMaybe<ScheduledReleaseUpdateWithNestedWhereUniqueInput>;
  /** Upsert single ScheduledRelease document */
  upsert?: InputMaybe<ScheduledReleaseUpsertWithNestedWhereUniqueInput>;
};

export type ScheduledReleaseUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ScheduledReleaseUpdateInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

export type ScheduledReleaseUpsertInput = {
  /** Create document if it didn't exist */
  create: ScheduledReleaseCreateInput;
  /** Update document if it exists */
  update: ScheduledReleaseUpdateInput;
};

export type ScheduledReleaseUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ScheduledReleaseUpsertInput;
  /** Unique document search */
  where: ScheduledReleaseWhereUniqueInput;
};

/** Identifies documents */
export type ScheduledReleaseWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ScheduledReleaseWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  description?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  description_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  description_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  description_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  description_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  description_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  description_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  description_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  description_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  description_starts_with?: InputMaybe<Scalars['String']>;
  errorMessage?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  errorMessage_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  errorMessage_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  errorMessage_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  errorMessage_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  errorMessage_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  errorMessage_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  errorMessage_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  errorMessage_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  errorMessage_starts_with?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  isImplicit?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isImplicit_not?: InputMaybe<Scalars['Boolean']>;
  operations_every?: InputMaybe<ScheduledOperationWhereInput>;
  operations_none?: InputMaybe<ScheduledOperationWhereInput>;
  operations_some?: InputMaybe<ScheduledOperationWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  releaseAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  releaseAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  releaseAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  releaseAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  releaseAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  releaseAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  releaseAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  status?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are contained in given list. */
  status_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  /** Any other value that exists and is not equal to the given value. */
  status_not?: InputMaybe<ScheduledReleaseStatus>;
  /** All values that are not contained in given list. */
  status_not_in?: InputMaybe<Array<InputMaybe<ScheduledReleaseStatus>>>;
  title?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  title_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  title_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  title_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  title_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  title_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  title_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  title_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  title_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  title_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** References ScheduledRelease record uniquely */
export type ScheduledReleaseWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Season = Entity & Node & {
  __typename?: 'Season';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Season>;
  /** List of Season versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  name: Scalars['String'];
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  rounds: Array<Round>;
  scheduledIn: Array<ScheduledOperation>;
  slug?: Maybe<Scalars['String']>;
  /** System stage field */
  stage: Stage;
  startDate?: Maybe<Scalars['Date']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  year: Scalars['Int'];
};


export type SeasonCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type SeasonDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type SeasonHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type SeasonPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type SeasonRoundsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<RoundOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<RoundWhereInput>;
};


export type SeasonScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type SeasonUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type SeasonConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: SeasonWhereUniqueInput;
};

/** A connection to a list of items. */
export type SeasonConnection = {
  __typename?: 'SeasonConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<SeasonEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type SeasonCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  name: Scalars['String'];
  rounds?: InputMaybe<RoundCreateManyInlineInput>;
  slug?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  year: Scalars['Int'];
};

export type SeasonCreateManyInlineInput = {
  /** Connect multiple existing Season documents */
  connect?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  /** Create and connect multiple existing Season documents */
  create?: InputMaybe<Array<SeasonCreateInput>>;
};

export type SeasonCreateOneInlineInput = {
  /** Connect one existing Season document */
  connect?: InputMaybe<SeasonWhereUniqueInput>;
  /** Create and connect one Season document */
  create?: InputMaybe<SeasonCreateInput>;
};

/** An edge in a connection. */
export type SeasonEdge = {
  __typename?: 'SeasonEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Season;
};

/** Identifies documents */
export type SeasonManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeasonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeasonWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeasonWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SeasonWhereStageInput>;
  documentInStages_none?: InputMaybe<SeasonWhereStageInput>;
  documentInStages_some?: InputMaybe<SeasonWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  rounds_every?: InputMaybe<RoundWhereInput>;
  rounds_none?: InputMaybe<RoundWhereInput>;
  rounds_some?: InputMaybe<RoundWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  startDate_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  startDate_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  startDate_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  startDate_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  startDate_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  year?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  year_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  year_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  year_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  year_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  year_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  year_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  year_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

export enum SeasonOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  StartDateAsc = 'startDate_ASC',
  StartDateDesc = 'startDate_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  YearAsc = 'year_ASC',
  YearDesc = 'year_DESC'
}

export type SeasonUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  rounds?: InputMaybe<RoundUpdateManyInlineInput>;
  slug?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type SeasonUpdateManyInlineInput = {
  /** Connect multiple existing Season documents */
  connect?: InputMaybe<Array<SeasonConnectInput>>;
  /** Create and connect multiple Season documents */
  create?: InputMaybe<Array<SeasonCreateInput>>;
  /** Delete multiple Season documents */
  delete?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  /** Disconnect multiple Season documents */
  disconnect?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Season documents */
  set?: InputMaybe<Array<SeasonWhereUniqueInput>>;
  /** Update multiple Season documents */
  update?: InputMaybe<Array<SeasonUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Season documents */
  upsert?: InputMaybe<Array<SeasonUpsertWithNestedWhereUniqueInput>>;
};

export type SeasonUpdateManyInput = {
  name?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  year?: InputMaybe<Scalars['Int']>;
};

export type SeasonUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: SeasonUpdateManyInput;
  /** Document search */
  where: SeasonWhereInput;
};

export type SeasonUpdateOneInlineInput = {
  /** Connect existing Season document */
  connect?: InputMaybe<SeasonWhereUniqueInput>;
  /** Create and connect one Season document */
  create?: InputMaybe<SeasonCreateInput>;
  /** Delete currently connected Season document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Season document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Season document */
  update?: InputMaybe<SeasonUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Season document */
  upsert?: InputMaybe<SeasonUpsertWithNestedWhereUniqueInput>;
};

export type SeasonUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: SeasonUpdateInput;
  /** Unique document search */
  where: SeasonWhereUniqueInput;
};

export type SeasonUpsertInput = {
  /** Create document if it didn't exist */
  create: SeasonCreateInput;
  /** Update document if it exists */
  update: SeasonUpdateInput;
};

export type SeasonUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: SeasonUpsertInput;
  /** Unique document search */
  where: SeasonWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type SeasonWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type SeasonWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeasonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeasonWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeasonWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<SeasonWhereStageInput>;
  documentInStages_none?: InputMaybe<SeasonWhereStageInput>;
  documentInStages_some?: InputMaybe<SeasonWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  rounds_every?: InputMaybe<RoundWhereInput>;
  rounds_none?: InputMaybe<RoundWhereInput>;
  rounds_some?: InputMaybe<RoundWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  slug?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  slug_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  slug_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  slug_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  slug_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  slug_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  slug_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  slug_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  slug_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  slug_starts_with?: InputMaybe<Scalars['String']>;
  startDate?: InputMaybe<Scalars['Date']>;
  /** All values greater than the given value. */
  startDate_gt?: InputMaybe<Scalars['Date']>;
  /** All values greater than or equal the given value. */
  startDate_gte?: InputMaybe<Scalars['Date']>;
  /** All values that are contained in given list. */
  startDate_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  /** All values less than the given value. */
  startDate_lt?: InputMaybe<Scalars['Date']>;
  /** All values less than or equal the given value. */
  startDate_lte?: InputMaybe<Scalars['Date']>;
  /** Any other value that exists and is not equal to the given value. */
  startDate_not?: InputMaybe<Scalars['Date']>;
  /** All values that are not contained in given list. */
  startDate_not_in?: InputMaybe<Array<InputMaybe<Scalars['Date']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
  year?: InputMaybe<Scalars['Int']>;
  /** All values greater than the given value. */
  year_gt?: InputMaybe<Scalars['Int']>;
  /** All values greater than or equal the given value. */
  year_gte?: InputMaybe<Scalars['Int']>;
  /** All values that are contained in given list. */
  year_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
  /** All values less than the given value. */
  year_lt?: InputMaybe<Scalars['Int']>;
  /** All values less than or equal the given value. */
  year_lte?: InputMaybe<Scalars['Int']>;
  /** Any other value that exists and is not equal to the given value. */
  year_not?: InputMaybe<Scalars['Int']>;
  /** All values that are not contained in given list. */
  year_not_in?: InputMaybe<Array<InputMaybe<Scalars['Int']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type SeasonWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<SeasonWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<SeasonWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<SeasonWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<SeasonWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Season record uniquely */
export type SeasonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
};

/** Stage system enumeration */
export enum Stage {
  /** The Draft is the default stage for all your content. */
  Draft = 'DRAFT',
  /** The Published stage is where you can publish your content to. */
  Published = 'PUBLISHED'
}

export enum SystemDateTimeFieldVariation {
  Base = 'BASE',
  Combined = 'COMBINED',
  Localization = 'LOCALIZATION'
}

export type Team = Entity & Node & {
  __typename?: 'Team';
  class?: Maybe<Class>;
  color?: Maybe<Color>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  deleted: Scalars['Boolean'];
  /** Get the document in other stages */
  documentInStages: Array<Team>;
  driver: Array<Driver>;
  /** List of Team versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type TeamCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeamDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type TeamDriverArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<DriverOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverWhereInput>;
};


export type TeamHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type TeamPhotoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type TeamPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeamScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type TeamUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TeamConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: TeamWhereUniqueInput;
};

/** A connection to a list of items. */
export type TeamConnection = {
  __typename?: 'TeamConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<TeamEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type TeamCreateInput = {
  class?: InputMaybe<Class>;
  color?: InputMaybe<ColorInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deleted: Scalars['Boolean'];
  driver?: InputMaybe<DriverCreateManyInlineInput>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TeamCreateManyInlineInput = {
  /** Connect multiple existing Team documents */
  connect?: InputMaybe<Array<TeamWhereUniqueInput>>;
  /** Create and connect multiple existing Team documents */
  create?: InputMaybe<Array<TeamCreateInput>>;
};

export type TeamCreateOneInlineInput = {
  /** Connect one existing Team document */
  connect?: InputMaybe<TeamWhereUniqueInput>;
  /** Create and connect one Team document */
  create?: InputMaybe<TeamCreateInput>;
};

/** An edge in a connection. */
export type TeamEdge = {
  __typename?: 'TeamEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Team;
};

/** Identifies documents */
export type TeamManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeamWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeamWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeamWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  /** All values that are contained in given list. */
  class_in?: InputMaybe<Array<InputMaybe<Class>>>;
  /** Any other value that exists and is not equal to the given value. */
  class_not?: InputMaybe<Class>;
  /** All values that are not contained in given list. */
  class_not_in?: InputMaybe<Array<InputMaybe<Class>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<TeamWhereStageInput>;
  documentInStages_none?: InputMaybe<TeamWhereStageInput>;
  documentInStages_some?: InputMaybe<TeamWhereStageInput>;
  driver_every?: InputMaybe<DriverWhereInput>;
  driver_none?: InputMaybe<DriverWhereInput>;
  driver_some?: InputMaybe<DriverWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum TeamOrderByInput {
  ClassAsc = 'class_ASC',
  ClassDesc = 'class_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DeletedAsc = 'deleted_ASC',
  DeletedDesc = 'deleted_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TeamUpdateInput = {
  class?: InputMaybe<Class>;
  color?: InputMaybe<ColorInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  driver?: InputMaybe<DriverUpdateManyInlineInput>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
};

export type TeamUpdateManyInlineInput = {
  /** Connect multiple existing Team documents */
  connect?: InputMaybe<Array<TeamConnectInput>>;
  /** Create and connect multiple Team documents */
  create?: InputMaybe<Array<TeamCreateInput>>;
  /** Delete multiple Team documents */
  delete?: InputMaybe<Array<TeamWhereUniqueInput>>;
  /** Disconnect multiple Team documents */
  disconnect?: InputMaybe<Array<TeamWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Team documents */
  set?: InputMaybe<Array<TeamWhereUniqueInput>>;
  /** Update multiple Team documents */
  update?: InputMaybe<Array<TeamUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Team documents */
  upsert?: InputMaybe<Array<TeamUpsertWithNestedWhereUniqueInput>>;
};

export type TeamUpdateManyInput = {
  class?: InputMaybe<Class>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TeamUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: TeamUpdateManyInput;
  /** Document search */
  where: TeamWhereInput;
};

export type TeamUpdateOneInlineInput = {
  /** Connect existing Team document */
  connect?: InputMaybe<TeamWhereUniqueInput>;
  /** Create and connect one Team document */
  create?: InputMaybe<TeamCreateInput>;
  /** Delete currently connected Team document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Team document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Team document */
  update?: InputMaybe<TeamUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Team document */
  upsert?: InputMaybe<TeamUpsertWithNestedWhereUniqueInput>;
};

export type TeamUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: TeamUpdateInput;
  /** Unique document search */
  where: TeamWhereUniqueInput;
};

export type TeamUpsertInput = {
  /** Create document if it didn't exist */
  create: TeamCreateInput;
  /** Update document if it exists */
  update: TeamUpdateInput;
};

export type TeamUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: TeamUpsertInput;
  /** Unique document search */
  where: TeamWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type TeamWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type TeamWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeamWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeamWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeamWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  class?: InputMaybe<Class>;
  /** All values that are contained in given list. */
  class_in?: InputMaybe<Array<InputMaybe<Class>>>;
  /** Any other value that exists and is not equal to the given value. */
  class_not?: InputMaybe<Class>;
  /** All values that are not contained in given list. */
  class_not_in?: InputMaybe<Array<InputMaybe<Class>>>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  deleted?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  deleted_not?: InputMaybe<Scalars['Boolean']>;
  documentInStages_every?: InputMaybe<TeamWhereStageInput>;
  documentInStages_none?: InputMaybe<TeamWhereStageInput>;
  documentInStages_some?: InputMaybe<TeamWhereStageInput>;
  driver_every?: InputMaybe<DriverWhereInput>;
  driver_none?: InputMaybe<DriverWhereInput>;
  driver_some?: InputMaybe<DriverWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetWhereInput>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type TeamWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeamWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeamWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeamWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<TeamWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Team record uniquely */
export type TeamWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Track = Entity & Node & {
  __typename?: 'Track';
  circuit?: Maybe<Scalars['String']>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Track>;
  flag?: Maybe<Asset>;
  /** List of Track versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  /** System stage field */
  stage: Stage;
  /** Campo único do banco de dados do app Racing League Tool, da tabela "Tracks" */
  uniqueName?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type TrackCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TrackDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type TrackFlagArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
  where?: InputMaybe<AssetSingleRelationWhereInput>;
};


export type TrackHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type TrackPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TrackScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type TrackUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TrackConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: TrackWhereUniqueInput;
};

/** A connection to a list of items. */
export type TrackConnection = {
  __typename?: 'TrackConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<TrackEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type TrackCreateInput = {
  circuit?: InputMaybe<Scalars['String']>;
  cm8vzcqif1b5b07lq817q6irx?: InputMaybe<RoundCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  flag?: InputMaybe<AssetCreateOneInlineInput>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  uniqueName?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TrackCreateManyInlineInput = {
  /** Connect multiple existing Track documents */
  connect?: InputMaybe<Array<TrackWhereUniqueInput>>;
  /** Create and connect multiple existing Track documents */
  create?: InputMaybe<Array<TrackCreateInput>>;
};

export type TrackCreateOneInlineInput = {
  /** Connect one existing Track document */
  connect?: InputMaybe<TrackWhereUniqueInput>;
  /** Create and connect one Track document */
  create?: InputMaybe<TrackCreateInput>;
};

/** An edge in a connection. */
export type TrackEdge = {
  __typename?: 'TrackEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Track;
};

/** Identifies documents */
export type TrackManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TrackWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TrackWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TrackWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  circuit?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  circuit_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  circuit_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  circuit_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  circuit_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  circuit_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  circuit_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  circuit_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  circuit_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  circuit_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<TrackWhereStageInput>;
  documentInStages_none?: InputMaybe<TrackWhereStageInput>;
  documentInStages_some?: InputMaybe<TrackWhereStageInput>;
  flag?: InputMaybe<AssetWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  location_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  location_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  location_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  location_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  location_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  location_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  location_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  location_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  location_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  uniqueName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  uniqueName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  uniqueName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  uniqueName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  uniqueName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  uniqueName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  uniqueName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  uniqueName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  uniqueName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  uniqueName_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

export enum TrackOrderByInput {
  CircuitAsc = 'circuit_ASC',
  CircuitDesc = 'circuit_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LocationAsc = 'location_ASC',
  LocationDesc = 'location_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UniqueNameAsc = 'uniqueName_ASC',
  UniqueNameDesc = 'uniqueName_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TrackUpdateInput = {
  circuit?: InputMaybe<Scalars['String']>;
  cm8vzcqif1b5b07lq817q6irx?: InputMaybe<RoundUpdateManyInlineInput>;
  flag?: InputMaybe<AssetUpdateOneInlineInput>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  uniqueName?: InputMaybe<Scalars['String']>;
};

export type TrackUpdateManyInlineInput = {
  /** Connect multiple existing Track documents */
  connect?: InputMaybe<Array<TrackConnectInput>>;
  /** Create and connect multiple Track documents */
  create?: InputMaybe<Array<TrackCreateInput>>;
  /** Delete multiple Track documents */
  delete?: InputMaybe<Array<TrackWhereUniqueInput>>;
  /** Disconnect multiple Track documents */
  disconnect?: InputMaybe<Array<TrackWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Track documents */
  set?: InputMaybe<Array<TrackWhereUniqueInput>>;
  /** Update multiple Track documents */
  update?: InputMaybe<Array<TrackUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Track documents */
  upsert?: InputMaybe<Array<TrackUpsertWithNestedWhereUniqueInput>>;
};

export type TrackUpdateManyInput = {
  circuit?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TrackUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: TrackUpdateManyInput;
  /** Document search */
  where: TrackWhereInput;
};

export type TrackUpdateOneInlineInput = {
  /** Connect existing Track document */
  connect?: InputMaybe<TrackWhereUniqueInput>;
  /** Create and connect one Track document */
  create?: InputMaybe<TrackCreateInput>;
  /** Delete currently connected Track document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Track document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Track document */
  update?: InputMaybe<TrackUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Track document */
  upsert?: InputMaybe<TrackUpsertWithNestedWhereUniqueInput>;
};

export type TrackUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: TrackUpdateInput;
  /** Unique document search */
  where: TrackWhereUniqueInput;
};

export type TrackUpsertInput = {
  /** Create document if it didn't exist */
  create: TrackCreateInput;
  /** Update document if it exists */
  update: TrackUpdateInput;
};

export type TrackUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: TrackUpsertInput;
  /** Unique document search */
  where: TrackWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type TrackWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type TrackWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TrackWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TrackWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TrackWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  circuit?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  circuit_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  circuit_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  circuit_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  circuit_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  circuit_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  circuit_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  circuit_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  circuit_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  circuit_starts_with?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  createdBy?: InputMaybe<UserWhereInput>;
  documentInStages_every?: InputMaybe<TrackWhereStageInput>;
  documentInStages_none?: InputMaybe<TrackWhereStageInput>;
  documentInStages_some?: InputMaybe<TrackWhereStageInput>;
  flag?: InputMaybe<AssetWhereInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  location_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  location_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  location_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  location_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  location_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  location_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  location_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  location_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  location_starts_with?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  publishedBy?: InputMaybe<UserWhereInput>;
  scheduledIn_every?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_none?: InputMaybe<ScheduledOperationWhereInput>;
  scheduledIn_some?: InputMaybe<ScheduledOperationWhereInput>;
  uniqueName?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  uniqueName_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  uniqueName_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  uniqueName_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  uniqueName_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  uniqueName_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  uniqueName_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  uniqueName_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  uniqueName_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  uniqueName_starts_with?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedBy?: InputMaybe<UserWhereInput>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type TrackWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TrackWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TrackWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TrackWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<TrackWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Track record uniquely */
export type TrackWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  uniqueName?: InputMaybe<Scalars['String']>;
};

export type UnpublishLocaleInput = {
  /** Locales to unpublish */
  locale: Locale;
  /** Stages to unpublish selected locales from */
  stages: Array<Stage>;
};

/** User system model */
export type User = Entity & Node & {
  __typename?: 'User';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** Get the document in other stages */
  documentInStages: Array<User>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** Flag to determine if user is active or not */
  isActive: Scalars['Boolean'];
  /** User Kind. Can be either MEMBER, PAT or PUBLIC */
  kind: UserKind;
  /** The username */
  name: Scalars['String'];
  /** Profile Picture url */
  picture?: Maybe<Scalars['String']>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
};


/** User system model */
export type UserDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};

export type UserConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: UserWhereUniqueInput;
};

/** A connection to a list of items. */
export type UserConnection = {
  __typename?: 'UserConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<UserEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type UserCreateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserCreateOneInlineInput = {
  /** Connect one existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
};

/** An edge in a connection. */
export type UserEdge = {
  __typename?: 'UserEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: User;
};

/** System User Kind */
export enum UserKind {
  Member = 'MEMBER',
  Pat = 'PAT',
  Public = 'PUBLIC',
  Webhook = 'WEBHOOK'
}

/** Identifies documents */
export type UserManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

export enum UserOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  IsActiveAsc = 'isActive_ASC',
  IsActiveDesc = 'isActive_DESC',
  KindAsc = 'kind_ASC',
  KindDesc = 'kind_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PictureAsc = 'picture_ASC',
  PictureDesc = 'picture_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type UserUpdateManyInlineInput = {
  /** Connect multiple existing User documents */
  connect?: InputMaybe<Array<UserConnectInput>>;
  /** Disconnect multiple User documents */
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing User documents */
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserUpdateOneInlineInput = {
  /** Connect existing User document */
  connect?: InputMaybe<UserWhereUniqueInput>;
  /** Disconnect currently connected User document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
};

/** This contains a set of filters that can be used to compare values internally */
export type UserWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type UserWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  createdAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  createdAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  createdAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  createdAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  createdAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  createdAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  createdAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  documentInStages_every?: InputMaybe<UserWhereStageInput>;
  documentInStages_none?: InputMaybe<UserWhereStageInput>;
  documentInStages_some?: InputMaybe<UserWhereStageInput>;
  id?: InputMaybe<Scalars['ID']>;
  /** All values containing the given string. */
  id_contains?: InputMaybe<Scalars['ID']>;
  /** All values ending with the given string. */
  id_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are contained in given list. */
  id_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** Any other value that exists and is not equal to the given value. */
  id_not?: InputMaybe<Scalars['ID']>;
  /** All values not containing the given string. */
  id_not_contains?: InputMaybe<Scalars['ID']>;
  /** All values not ending with the given string */
  id_not_ends_with?: InputMaybe<Scalars['ID']>;
  /** All values that are not contained in given list. */
  id_not_in?: InputMaybe<Array<InputMaybe<Scalars['ID']>>>;
  /** All values not starting with the given string. */
  id_not_starts_with?: InputMaybe<Scalars['ID']>;
  /** All values starting with the given string. */
  id_starts_with?: InputMaybe<Scalars['ID']>;
  isActive?: InputMaybe<Scalars['Boolean']>;
  /** Any other value that exists and is not equal to the given value. */
  isActive_not?: InputMaybe<Scalars['Boolean']>;
  kind?: InputMaybe<UserKind>;
  /** All values that are contained in given list. */
  kind_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  /** Any other value that exists and is not equal to the given value. */
  kind_not?: InputMaybe<UserKind>;
  /** All values that are not contained in given list. */
  kind_not_in?: InputMaybe<Array<InputMaybe<UserKind>>>;
  name?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  name_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  name_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  name_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  name_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  name_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  name_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  name_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  name_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  name_starts_with?: InputMaybe<Scalars['String']>;
  picture?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  picture_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  picture_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  picture_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  picture_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  picture_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  picture_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  picture_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  picture_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  picture_starts_with?: InputMaybe<Scalars['String']>;
  publishedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  publishedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  publishedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  publishedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  publishedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  publishedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  publishedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  publishedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  updatedAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  updatedAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  updatedAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  updatedAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  updatedAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  updatedAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  updatedAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type UserWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<UserWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<UserWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<UserWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References User record uniquely */
export type UserWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Version = {
  __typename?: 'Version';
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export type VersionWhereInput = {
  id: Scalars['ID'];
  revision: Scalars['Int'];
  stage: Stage;
};

export enum _FilterKind {
  And = 'AND',
  Not = 'NOT',
  Or = 'OR',
  Contains = 'contains',
  ContainsAll = 'contains_all',
  ContainsNone = 'contains_none',
  ContainsSome = 'contains_some',
  DescendantsOf = 'descendants_of',
  EndsWith = 'ends_with',
  Eq = 'eq',
  EqNot = 'eq_not',
  Gt = 'gt',
  Gte = 'gte',
  In = 'in',
  JsonPathExists = 'json_path_exists',
  JsonValueRecursive = 'json_value_recursive',
  Lt = 'lt',
  Lte = 'lte',
  NotContains = 'not_contains',
  NotEndsWith = 'not_ends_with',
  NotIn = 'not_in',
  NotStartsWith = 'not_starts_with',
  RelationalEvery = 'relational_every',
  RelationalNone = 'relational_none',
  RelationalSingle = 'relational_single',
  RelationalSome = 'relational_some',
  Search = 'search',
  StartsWith = 'starts_with',
  UnionEmpty = 'union_empty',
  UnionEvery = 'union_every',
  UnionNone = 'union_none',
  UnionSingle = 'union_single',
  UnionSome = 'union_some'
}

export enum _MutationInputFieldKind {
  Enum = 'enum',
  Relation = 'relation',
  RichText = 'richText',
  RichTextWithEmbeds = 'richTextWithEmbeds',
  Scalar = 'scalar',
  Union = 'union',
  Virtual = 'virtual'
}

export enum _MutationKind {
  Create = 'create',
  Delete = 'delete',
  DeleteMany = 'deleteMany',
  Publish = 'publish',
  PublishMany = 'publishMany',
  SchedulePublish = 'schedulePublish',
  ScheduleUnpublish = 'scheduleUnpublish',
  Unpublish = 'unpublish',
  UnpublishMany = 'unpublishMany',
  Update = 'update',
  UpdateMany = 'updateMany',
  Upsert = 'upsert'
}

export enum _OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export enum _RelationInputCardinality {
  Many = 'many',
  One = 'one'
}

export enum _RelationInputKind {
  Create = 'create',
  Update = 'update'
}

export enum _RelationKind {
  Regular = 'regular',
  Union = 'union'
}

export enum _SystemDateTimeFieldVariation {
  Base = 'base',
  Combined = 'combined',
  Localization = 'localization'
}

/** One possible value for a given Enum. Enum values are unique values, not a placeholder for a string or numeric value. However an Enum value is returned in a JSON response as a string. */
export type __EnumValue = {
  __typename?: '__EnumValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __Field = {
  __typename?: '__Field';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  args: Array<__InputValue>;
  type: __Type;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};


/** Object and Interface types are described by a list of Fields, each of which has a name, potentially a list of arguments, and a return type. */
export type __FieldArgsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** Arguments provided to Fields or Directives and the input fields of an InputObject are represented as Input Values which describe their type and optionally a default value. */
export type __InputValue = {
  __typename?: '__InputValue';
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  type: __Type;
  /** A GraphQL-formatted string representing the default value for this input value. */
  defaultValue?: Maybe<Scalars['String']>;
  isDeprecated: Scalars['Boolean'];
  deprecationReason?: Maybe<Scalars['String']>;
};

/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __Type = {
  __typename?: '__Type';
  kind: __TypeKind;
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  specifiedByUrl?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<__Field>>;
  interfaces?: Maybe<Array<__Type>>;
  possibleTypes?: Maybe<Array<__Type>>;
  enumValues?: Maybe<Array<__EnumValue>>;
  inputFields?: Maybe<Array<__InputValue>>;
  ofType?: Maybe<__Type>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeEnumValuesArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};


/**
 * The fundamental unit of any GraphQL Schema is the type. There are many kinds of types in GraphQL as represented by the `__TypeKind` enum.
 *
 * Depending on the kind of a type, certain fields describe information about that type. Scalar types provide no information beyond a name, description and optional `specifiedByUrl`, while Enum types provide their values. Object and Interface types provide the fields they describe. Abstract types, Union and Interface, provide the Object types possible at runtime. List and NonNull types compose other types.
 */
export type __TypeInputFieldsArgs = {
  includeDeprecated?: InputMaybe<Scalars['Boolean']>;
};

/** An enum describing what kind of type a given `__Type` is. */
export enum __TypeKind {
  /** Indicates this type is a scalar. */
  Scalar = 'SCALAR',
  /** Indicates this type is an object. `fields` and `interfaces` are valid fields. */
  Object = 'OBJECT',
  /** Indicates this type is an interface. `fields`, `interfaces`, and `possibleTypes` are valid fields. */
  Interface = 'INTERFACE',
  /** Indicates this type is a union. `possibleTypes` is a valid field. */
  Union = 'UNION',
  /** Indicates this type is an enum. `enumValues` is a valid field. */
  Enum = 'ENUM',
  /** Indicates this type is an input object. `inputFields` is a valid field. */
  InputObject = 'INPUT_OBJECT',
  /** Indicates this type is a list. `ofType` is a valid field. */
  List = 'LIST',
  /** Indicates this type is a non-null. `ofType` is a valid field. */
  NonNull = 'NON_NULL'
}

export type CreateAssetMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateAssetMutation = { __typename?: 'Mutation', createAsset?: { __typename?: 'Asset', id: string, url: string, upload?: { __typename?: 'AssetUpload', status?: AssetUploadStatus | null, expiresAt?: any | null, error?: { __typename?: 'AssetUploadError', code: string, message: string } | null, requestPostData?: { __typename?: 'AssetUploadRequestPostData', url: string, date: string, key: string, signature: string, algorithm: string, policy: string, credential: string, securityToken?: string | null } | null } | null } | null };

export type CreateBannerMutationVariables = Exact<{
  data: BannerCreateInput;
}>;


export type CreateBannerMutation = { __typename?: 'Mutation', createBanner?: { __typename?: 'Banner', id: string, title?: string | null, content?: string | null, deleted: boolean, link?: string | null, category: NewsCategory, createdAt: any, photo?: { __typename?: 'Asset', id: string, url: string } | null } | null };

export type CreateCalendarMutationVariables = Exact<{
  data: CalendarCreateInput;
}>;


export type CreateCalendarMutation = { __typename?: 'Mutation', createCalendar?: { __typename?: 'Calendar', id: string, track?: string | null, round?: string | null, deleted: boolean, description?: string | null, date?: any | null, active: boolean, link?: string | null, createdAt: any, flag?: { __typename?: 'Asset', id: string, url: string } | null } | null };

export type CreateDriverMutationVariables = Exact<{
  data: DriverCreateInput;
}>;


export type CreateDriverMutation = { __typename?: 'Mutation', createDriver?: { __typename?: 'Driver', id: string, name?: string | null, number?: string | null, grid?: Grid | null, class?: Class | null, stream?: string | null, deleted?: boolean | null, city?: string | null, equipment?: string | null, phone?: string | null, photo?: { __typename?: 'Asset', url: string } | null, team?: { __typename?: 'Team', id: string, name?: string | null, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null } | null } | null };

export type CreateHallOfFameMutationVariables = Exact<{
  data: HallOfFameCreateInput;
}>;


export type CreateHallOfFameMutation = { __typename?: 'Mutation', createHallOfFame?: { __typename?: 'HallOfFame', id: string, season: string, deleted: boolean, photo: Array<{ __typename?: 'Asset', url: string }> } | null };

export type CreateDataMutationVariables = Exact<{
  data: DataCreateInput;
}>;


export type CreateDataMutation = { __typename?: 'Mutation', createData?: { __typename?: 'Data', id: string, grid: Grid, deleted: boolean, csv?: { __typename?: 'Asset', url: string } | null } | null };

export type CreateTeamMutationVariables = Exact<{
  data: TeamCreateInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam?: { __typename?: 'Team', id: string, name?: string | null, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null, driver: Array<{ __typename?: 'Driver', id: string, name?: string | null, number?: string | null, grid?: Grid | null, stream?: string | null, deleted?: boolean | null, city?: string | null, equipment?: string | null, phone?: string | null, photo?: { __typename?: 'Asset', url: string } | null }> } | null };

export type UpdateBannerMutationVariables = Exact<{
  where: BannerWhereUniqueInput;
  data: BannerUpdateInput;
}>;


export type UpdateBannerMutation = { __typename?: 'Mutation', updateBanner?: { __typename?: 'Banner', id: string, title?: string | null, content?: string | null, deleted: boolean, link?: string | null, category: NewsCategory, updatedAt: any, photo?: { __typename?: 'Asset', id: string, url: string } | null } | null };

export type UpdateCalendarMutationVariables = Exact<{
  where: CalendarWhereUniqueInput;
  data: CalendarUpdateInput;
}>;


export type UpdateCalendarMutation = { __typename?: 'Mutation', updateCalendar?: { __typename?: 'Calendar', id: string, track?: string | null, round?: string | null, description?: string | null, deleted: boolean, date?: any | null, link?: string | null, updatedAt: any, flag?: { __typename?: 'Asset', id: string, url: string } | null } | null };

export type UpdateDriverMutationVariables = Exact<{
  where: DriverWhereUniqueInput;
  data: DriverUpdateInput;
}>;


export type UpdateDriverMutation = { __typename?: 'Mutation', updateDriver?: { __typename?: 'Driver', id: string, name?: string | null, number?: string | null, grid?: Grid | null, class?: Class | null, stream?: string | null, deleted?: boolean | null, city?: string | null, equipment?: string | null, phone?: string | null, photo?: { __typename?: 'Asset', url: string } | null, team?: { __typename?: 'Team', id: string, name?: string | null, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null } | null } | null };

export type UpdateHallOfFameMutationVariables = Exact<{
  where: HallOfFameWhereUniqueInput;
  data: HallOfFameUpdateInput;
}>;


export type UpdateHallOfFameMutation = { __typename?: 'Mutation', updateHallOfFame?: { __typename?: 'HallOfFame', id: string, season: string, deleted: boolean, photo: Array<{ __typename?: 'Asset', url: string }> } | null };

export type UpdateDataMutationVariables = Exact<{
  where: DataWhereUniqueInput;
  data: DataUpdateInput;
}>;


export type UpdateDataMutation = { __typename?: 'Mutation', updateData?: { __typename?: 'Data', id: string, deleted: boolean, grid: Grid, csv?: { __typename?: 'Asset', url: string } | null } | null };

export type UpdateTeamMutationVariables = Exact<{
  where: TeamWhereUniqueInput;
  data: TeamUpdateInput;
}>;


export type UpdateTeamMutation = { __typename?: 'Mutation', updateTeam?: { __typename?: 'Team', id: string, name?: string | null, deleted: boolean, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null, driver: Array<{ __typename?: 'Driver', id: string, name?: string | null, number?: string | null, grid?: Grid | null, stream?: string | null, deleted?: boolean | null, city?: string | null, equipment?: string | null, phone?: string | null, photo?: { __typename?: 'Asset', url: string } | null }> } | null };

export type GetBannersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBannersQuery = { __typename?: 'Query', banners: Array<{ __typename?: 'Banner', id: string, title?: string | null, content?: string | null, link?: string | null, deleted: boolean, category: NewsCategory, createdAt: any, updatedAt: any, photo?: { __typename?: 'Asset', id: string, url: string } | null }> };

export type GetBannersRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBannersRegistrationQuery = { __typename?: 'Query', banners: Array<{ __typename?: 'Banner', id: string, title?: string | null, content?: string | null, link?: string | null, deleted: boolean, category: NewsCategory, createdAt: any, photo?: { __typename?: 'Asset', id: string, url: string } | null }> };

export type GetBannersCategoriesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetBannersCategoriesQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null };

export type GetCalendarsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCalendarsQuery = { __typename?: 'Query', calendars: Array<{ __typename?: 'Calendar', id: string, track?: string | null, round?: string | null, active: boolean, deleted: boolean, grid: Grid, description?: string | null, date?: any | null, link?: string | null, flag?: { __typename?: 'Asset', url: string } | null }> };

export type GetCalendarsRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCalendarsRegistrationQuery = { __typename?: 'Query', calendars: Array<{ __typename?: 'Calendar', id: string, track?: string | null, round?: string | null, active: boolean, grid: Grid, deleted: boolean, description?: string | null, date?: any | null, link?: string | null, flag?: { __typename?: 'Asset', url: string } | null }> };

export type GetHallsOfFameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHallsOfFameQuery = { __typename?: 'Query', hallsOfFame: Array<{ __typename?: 'HallOfFame', id: string, season: string, deleted: boolean, photo: Array<{ __typename?: 'Asset', url: string }> }> };

export type GetHallsOfFameRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHallsOfFameRegistrationQuery = { __typename?: 'Query', hallsOfFame: Array<{ __typename?: 'HallOfFame', id: string, season: string, deleted: boolean, photo: Array<{ __typename?: 'Asset', url: string }> }> };

export type GetPartnersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPartnersQuery = { __typename?: 'Query', partners: Array<{ __typename?: 'Partner', id: string, name?: string | null, altText?: string | null, deleted: boolean, link?: string | null, active: boolean, image?: { __typename?: 'Asset', url: string } | null, footerLogo: { __typename?: 'Asset', url: string } }> };

export type GetSeasonRoundsQueryVariables = Exact<{
  slug: Scalars['String'];
}>;


export type GetSeasonRoundsQuery = { __typename?: 'Query', rounds: Array<{ __typename?: 'Round', id: string, name: string, link?: string | null, date?: any | null, track?: { __typename?: 'Track', id: string, name?: string | null, circuit?: string | null, location?: string | null, uniqueName?: string | null, flag?: { __typename?: 'Asset', url: string } | null } | null }> };

export type GetDriversQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDriversQuery = { __typename?: 'Query', drivers: Array<{ __typename?: 'Driver', id: string, grid?: Grid | null, name?: string | null, class?: Class | null, number?: string | null, stream?: string | null, deleted?: boolean | null, badgeTitle: Array<BadgeTitle>, city?: string | null, equipment?: string | null, phone?: string | null, photo?: { __typename?: 'Asset', url: string } | null, badge: Array<{ __typename?: 'Asset', url: string }>, team?: { __typename?: 'Team', name?: string | null, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null } | null }> };

export type GetDriversRegistrationQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDriversRegistrationQuery = { __typename?: 'Query', drivers: Array<{ __typename?: 'Driver', id: string, grid?: Grid | null, class?: Class | null, name?: string | null, number?: string | null, stream?: string | null, deleted?: boolean | null, badgeTitle: Array<BadgeTitle>, city?: string | null, equipment?: string | null, phone?: string | null, photo?: { __typename?: 'Asset', url: string } | null, badge: Array<{ __typename?: 'Asset', url: string }>, team?: { __typename?: 'Team', name?: string | null, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null } | null }> };

export type GridOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type GridOptionsQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null };

export type ClassOptionsQueryVariables = Exact<{ [key: string]: never; }>;


export type ClassOptionsQuery = { __typename?: 'Query', __type?: { __typename?: '__Type', enumValues?: Array<{ __typename?: '__EnumValue', name: string }> | null } | null };

export type GetRoundResultsQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetRoundResultsQuery = { __typename?: 'Query', round?: { __typename?: 'Round', id: string, name: string, date?: any | null, link?: string | null, results?: any | null, season?: { __typename?: 'Season', name: string } | null, track?: { __typename?: 'Track', id: string, name?: string | null, circuit?: string | null, location?: string | null, flag?: { __typename?: 'Asset', url: string } | null } | null } | null };

export type GetSeasonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetSeasonsQuery = { __typename?: 'Query', seasons: Array<{ __typename?: 'Season', id: string, name: string, year: number, slug?: string | null }> };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', drivers: Array<{ __typename?: 'Driver', id: string, name?: string | null, number?: string | null, stream?: string | null, deleted?: boolean | null, city?: string | null, equipment?: string | null, grid?: Grid | null, class?: Class | null, badgeTitle: Array<BadgeTitle>, team?: { __typename?: 'Team', name?: string | null, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null } | null, photo?: { __typename?: 'Asset', url: string } | null, badge: Array<{ __typename?: 'Asset', url: string }> }>, teams: Array<{ __typename?: 'Team', id: string, name?: string | null, class?: Class | null, deleted: boolean, color?: { __typename?: 'Color', hex: any } | null, photo?: { __typename?: 'Asset', url: string } | null }> };

export type GetStatsDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsDataQuery = { __typename?: 'Query', datas: Array<{ __typename?: 'Data', id: string, grid: Grid, csv?: { __typename?: 'Asset', url: string } | null }> };

export type GetDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDataQuery = { __typename?: 'Query', datas: Array<{ __typename?: 'Data', id: string, grid: Grid, deleted: boolean, createdAt: any, csv?: { __typename?: 'Asset', url: string } | null }> };

export type GetStatsDataAQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsDataAQuery = { __typename?: 'Query', datas: Array<{ __typename?: 'Data', id: string, grid: Grid, csv?: { __typename?: 'Asset', url: string } | null }> };

export type GetStatsDataBQueryVariables = Exact<{ [key: string]: never; }>;


export type GetStatsDataBQuery = { __typename?: 'Query', datas: Array<{ __typename?: 'Data', id: string, grid: Grid, csv?: { __typename?: 'Asset', url: string } | null }> };


export const CreateAssetDocument = gql`
    mutation createAsset {
  createAsset(data: {}) {
    id
    url
    upload {
      status
      expiresAt
      error {
        code
        message
      }
      requestPostData {
        url
        date
        key
        signature
        algorithm
        policy
        credential
        securityToken
      }
    }
  }
}
    `;
export type CreateAssetMutationFn = Apollo.MutationFunction<CreateAssetMutation, CreateAssetMutationVariables>;

/**
 * __useCreateAssetMutation__
 *
 * To run a mutation, you first call `useCreateAssetMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAssetMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAssetMutation, { data, loading, error }] = useCreateAssetMutation({
 *   variables: {
 *   },
 * });
 */
export function useCreateAssetMutation(baseOptions?: Apollo.MutationHookOptions<CreateAssetMutation, CreateAssetMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAssetMutation, CreateAssetMutationVariables>(CreateAssetDocument, options);
      }
export type CreateAssetMutationHookResult = ReturnType<typeof useCreateAssetMutation>;
export type CreateAssetMutationResult = Apollo.MutationResult<CreateAssetMutation>;
export type CreateAssetMutationOptions = Apollo.BaseMutationOptions<CreateAssetMutation, CreateAssetMutationVariables>;
export const CreateBannerDocument = gql`
    mutation CreateBanner($data: BannerCreateInput!) {
  createBanner(data: $data) {
    id
    title
    content
    deleted
    link
    category
    photo {
      id
      url
    }
    createdAt
  }
}
    `;
export type CreateBannerMutationFn = Apollo.MutationFunction<CreateBannerMutation, CreateBannerMutationVariables>;

/**
 * __useCreateBannerMutation__
 *
 * To run a mutation, you first call `useCreateBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBannerMutation, { data, loading, error }] = useCreateBannerMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateBannerMutation(baseOptions?: Apollo.MutationHookOptions<CreateBannerMutation, CreateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateBannerMutation, CreateBannerMutationVariables>(CreateBannerDocument, options);
      }
export type CreateBannerMutationHookResult = ReturnType<typeof useCreateBannerMutation>;
export type CreateBannerMutationResult = Apollo.MutationResult<CreateBannerMutation>;
export type CreateBannerMutationOptions = Apollo.BaseMutationOptions<CreateBannerMutation, CreateBannerMutationVariables>;
export const CreateCalendarDocument = gql`
    mutation CreateCalendar($data: CalendarCreateInput!) {
  createCalendar(data: $data) {
    id
    track
    round
    deleted
    description
    date
    active
    link
    flag {
      id
      url
    }
    createdAt
  }
}
    `;
export type CreateCalendarMutationFn = Apollo.MutationFunction<CreateCalendarMutation, CreateCalendarMutationVariables>;

/**
 * __useCreateCalendarMutation__
 *
 * To run a mutation, you first call `useCreateCalendarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCalendarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCalendarMutation, { data, loading, error }] = useCreateCalendarMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateCalendarMutation(baseOptions?: Apollo.MutationHookOptions<CreateCalendarMutation, CreateCalendarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCalendarMutation, CreateCalendarMutationVariables>(CreateCalendarDocument, options);
      }
export type CreateCalendarMutationHookResult = ReturnType<typeof useCreateCalendarMutation>;
export type CreateCalendarMutationResult = Apollo.MutationResult<CreateCalendarMutation>;
export type CreateCalendarMutationOptions = Apollo.BaseMutationOptions<CreateCalendarMutation, CreateCalendarMutationVariables>;
export const CreateDriverDocument = gql`
    mutation CreateDriver($data: DriverCreateInput!) {
  createDriver(data: $data) {
    id
    name
    number
    grid
    class
    stream
    deleted
    city
    equipment
    phone
    photo {
      url
    }
    team {
      id
      name
      color {
        hex
      }
      photo {
        url
      }
    }
  }
}
    `;
export type CreateDriverMutationFn = Apollo.MutationFunction<CreateDriverMutation, CreateDriverMutationVariables>;

/**
 * __useCreateDriverMutation__
 *
 * To run a mutation, you first call `useCreateDriverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDriverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDriverMutation, { data, loading, error }] = useCreateDriverMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDriverMutation(baseOptions?: Apollo.MutationHookOptions<CreateDriverMutation, CreateDriverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDriverMutation, CreateDriverMutationVariables>(CreateDriverDocument, options);
      }
export type CreateDriverMutationHookResult = ReturnType<typeof useCreateDriverMutation>;
export type CreateDriverMutationResult = Apollo.MutationResult<CreateDriverMutation>;
export type CreateDriverMutationOptions = Apollo.BaseMutationOptions<CreateDriverMutation, CreateDriverMutationVariables>;
export const CreateHallOfFameDocument = gql`
    mutation CreateHallOfFame($data: HallOfFameCreateInput!) {
  createHallOfFame(data: $data) {
    id
    season
    deleted
    photo {
      url
    }
  }
}
    `;
export type CreateHallOfFameMutationFn = Apollo.MutationFunction<CreateHallOfFameMutation, CreateHallOfFameMutationVariables>;

/**
 * __useCreateHallOfFameMutation__
 *
 * To run a mutation, you first call `useCreateHallOfFameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateHallOfFameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createHallOfFameMutation, { data, loading, error }] = useCreateHallOfFameMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateHallOfFameMutation(baseOptions?: Apollo.MutationHookOptions<CreateHallOfFameMutation, CreateHallOfFameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateHallOfFameMutation, CreateHallOfFameMutationVariables>(CreateHallOfFameDocument, options);
      }
export type CreateHallOfFameMutationHookResult = ReturnType<typeof useCreateHallOfFameMutation>;
export type CreateHallOfFameMutationResult = Apollo.MutationResult<CreateHallOfFameMutation>;
export type CreateHallOfFameMutationOptions = Apollo.BaseMutationOptions<CreateHallOfFameMutation, CreateHallOfFameMutationVariables>;
export const CreateDataDocument = gql`
    mutation CreateData($data: DataCreateInput!) {
  createData(data: $data) {
    id
    grid
    deleted
    csv {
      url
    }
  }
}
    `;
export type CreateDataMutationFn = Apollo.MutationFunction<CreateDataMutation, CreateDataMutationVariables>;

/**
 * __useCreateDataMutation__
 *
 * To run a mutation, you first call `useCreateDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDataMutation, { data, loading, error }] = useCreateDataMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateDataMutation(baseOptions?: Apollo.MutationHookOptions<CreateDataMutation, CreateDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDataMutation, CreateDataMutationVariables>(CreateDataDocument, options);
      }
export type CreateDataMutationHookResult = ReturnType<typeof useCreateDataMutation>;
export type CreateDataMutationResult = Apollo.MutationResult<CreateDataMutation>;
export type CreateDataMutationOptions = Apollo.BaseMutationOptions<CreateDataMutation, CreateDataMutationVariables>;
export const CreateTeamDocument = gql`
    mutation CreateTeam($data: TeamCreateInput!) {
  createTeam(data: $data) {
    id
    name
    color {
      hex
    }
    photo {
      url
    }
    driver {
      id
      name
      number
      grid
      stream
      deleted
      city
      equipment
      phone
      photo {
        url
      }
    }
  }
}
    `;
export type CreateTeamMutationFn = Apollo.MutationFunction<CreateTeamMutation, CreateTeamMutationVariables>;

/**
 * __useCreateTeamMutation__
 *
 * To run a mutation, you first call `useCreateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamMutation, { data, loading, error }] = useCreateTeamMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateTeamMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamMutation, CreateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamMutation, CreateTeamMutationVariables>(CreateTeamDocument, options);
      }
export type CreateTeamMutationHookResult = ReturnType<typeof useCreateTeamMutation>;
export type CreateTeamMutationResult = Apollo.MutationResult<CreateTeamMutation>;
export type CreateTeamMutationOptions = Apollo.BaseMutationOptions<CreateTeamMutation, CreateTeamMutationVariables>;
export const UpdateBannerDocument = gql`
    mutation UpdateBanner($where: BannerWhereUniqueInput!, $data: BannerUpdateInput!) {
  updateBanner(where: $where, data: $data) {
    id
    title
    content
    deleted
    link
    category
    photo {
      id
      url
    }
    updatedAt
  }
}
    `;
export type UpdateBannerMutationFn = Apollo.MutationFunction<UpdateBannerMutation, UpdateBannerMutationVariables>;

/**
 * __useUpdateBannerMutation__
 *
 * To run a mutation, you first call `useUpdateBannerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateBannerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateBannerMutation, { data, loading, error }] = useUpdateBannerMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateBannerMutation(baseOptions?: Apollo.MutationHookOptions<UpdateBannerMutation, UpdateBannerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateBannerMutation, UpdateBannerMutationVariables>(UpdateBannerDocument, options);
      }
export type UpdateBannerMutationHookResult = ReturnType<typeof useUpdateBannerMutation>;
export type UpdateBannerMutationResult = Apollo.MutationResult<UpdateBannerMutation>;
export type UpdateBannerMutationOptions = Apollo.BaseMutationOptions<UpdateBannerMutation, UpdateBannerMutationVariables>;
export const UpdateCalendarDocument = gql`
    mutation UpdateCalendar($where: CalendarWhereUniqueInput!, $data: CalendarUpdateInput!) {
  updateCalendar(where: $where, data: $data) {
    id
    track
    round
    description
    deleted
    date
    link
    flag {
      id
      url
    }
    updatedAt
  }
}
    `;
export type UpdateCalendarMutationFn = Apollo.MutationFunction<UpdateCalendarMutation, UpdateCalendarMutationVariables>;

/**
 * __useUpdateCalendarMutation__
 *
 * To run a mutation, you first call `useUpdateCalendarMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCalendarMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCalendarMutation, { data, loading, error }] = useUpdateCalendarMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateCalendarMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCalendarMutation, UpdateCalendarMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCalendarMutation, UpdateCalendarMutationVariables>(UpdateCalendarDocument, options);
      }
export type UpdateCalendarMutationHookResult = ReturnType<typeof useUpdateCalendarMutation>;
export type UpdateCalendarMutationResult = Apollo.MutationResult<UpdateCalendarMutation>;
export type UpdateCalendarMutationOptions = Apollo.BaseMutationOptions<UpdateCalendarMutation, UpdateCalendarMutationVariables>;
export const UpdateDriverDocument = gql`
    mutation UpdateDriver($where: DriverWhereUniqueInput!, $data: DriverUpdateInput!) {
  updateDriver(where: $where, data: $data) {
    id
    name
    number
    grid
    class
    stream
    deleted
    city
    equipment
    phone
    photo {
      url
    }
    team {
      id
      name
      color {
        hex
      }
      photo {
        url
      }
    }
  }
}
    `;
export type UpdateDriverMutationFn = Apollo.MutationFunction<UpdateDriverMutation, UpdateDriverMutationVariables>;

/**
 * __useUpdateDriverMutation__
 *
 * To run a mutation, you first call `useUpdateDriverMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDriverMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDriverMutation, { data, loading, error }] = useUpdateDriverMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDriverMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDriverMutation, UpdateDriverMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDriverMutation, UpdateDriverMutationVariables>(UpdateDriverDocument, options);
      }
export type UpdateDriverMutationHookResult = ReturnType<typeof useUpdateDriverMutation>;
export type UpdateDriverMutationResult = Apollo.MutationResult<UpdateDriverMutation>;
export type UpdateDriverMutationOptions = Apollo.BaseMutationOptions<UpdateDriverMutation, UpdateDriverMutationVariables>;
export const UpdateHallOfFameDocument = gql`
    mutation UpdateHallOfFame($where: HallOfFameWhereUniqueInput!, $data: HallOfFameUpdateInput!) {
  updateHallOfFame(where: $where, data: $data) {
    id
    season
    deleted
    photo {
      url
    }
  }
}
    `;
export type UpdateHallOfFameMutationFn = Apollo.MutationFunction<UpdateHallOfFameMutation, UpdateHallOfFameMutationVariables>;

/**
 * __useUpdateHallOfFameMutation__
 *
 * To run a mutation, you first call `useUpdateHallOfFameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateHallOfFameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateHallOfFameMutation, { data, loading, error }] = useUpdateHallOfFameMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateHallOfFameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateHallOfFameMutation, UpdateHallOfFameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateHallOfFameMutation, UpdateHallOfFameMutationVariables>(UpdateHallOfFameDocument, options);
      }
export type UpdateHallOfFameMutationHookResult = ReturnType<typeof useUpdateHallOfFameMutation>;
export type UpdateHallOfFameMutationResult = Apollo.MutationResult<UpdateHallOfFameMutation>;
export type UpdateHallOfFameMutationOptions = Apollo.BaseMutationOptions<UpdateHallOfFameMutation, UpdateHallOfFameMutationVariables>;
export const UpdateDataDocument = gql`
    mutation UpdateData($where: DataWhereUniqueInput!, $data: DataUpdateInput!) {
  updateData(where: $where, data: $data) {
    id
    deleted
    grid
    csv {
      url
    }
  }
}
    `;
export type UpdateDataMutationFn = Apollo.MutationFunction<UpdateDataMutation, UpdateDataMutationVariables>;

/**
 * __useUpdateDataMutation__
 *
 * To run a mutation, you first call `useUpdateDataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateDataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateDataMutation, { data, loading, error }] = useUpdateDataMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateDataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateDataMutation, UpdateDataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateDataMutation, UpdateDataMutationVariables>(UpdateDataDocument, options);
      }
export type UpdateDataMutationHookResult = ReturnType<typeof useUpdateDataMutation>;
export type UpdateDataMutationResult = Apollo.MutationResult<UpdateDataMutation>;
export type UpdateDataMutationOptions = Apollo.BaseMutationOptions<UpdateDataMutation, UpdateDataMutationVariables>;
export const UpdateTeamDocument = gql`
    mutation UpdateTeam($where: TeamWhereUniqueInput!, $data: TeamUpdateInput!) {
  updateTeam(where: $where, data: $data) {
    id
    name
    deleted
    color {
      hex
    }
    photo {
      url
    }
    driver {
      id
      name
      number
      grid
      stream
      deleted
      city
      equipment
      phone
      photo {
        url
      }
    }
  }
}
    `;
export type UpdateTeamMutationFn = Apollo.MutationFunction<UpdateTeamMutation, UpdateTeamMutationVariables>;

/**
 * __useUpdateTeamMutation__
 *
 * To run a mutation, you first call `useUpdateTeamMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateTeamMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateTeamMutation, { data, loading, error }] = useUpdateTeamMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateTeamMutation(baseOptions?: Apollo.MutationHookOptions<UpdateTeamMutation, UpdateTeamMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateTeamMutation, UpdateTeamMutationVariables>(UpdateTeamDocument, options);
      }
export type UpdateTeamMutationHookResult = ReturnType<typeof useUpdateTeamMutation>;
export type UpdateTeamMutationResult = Apollo.MutationResult<UpdateTeamMutation>;
export type UpdateTeamMutationOptions = Apollo.BaseMutationOptions<UpdateTeamMutation, UpdateTeamMutationVariables>;
export const GetBannersDocument = gql`
    query GetBanners {
  banners(orderBy: createdAt_DESC, where: {deleted: false}) {
    id
    title
    content
    link
    deleted
    category
    photo {
      id
      url
    }
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useGetBannersQuery__
 *
 * To run a query within a React component, call `useGetBannersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBannersQuery(baseOptions?: Apollo.QueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
      }
export function useGetBannersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBannersQuery, GetBannersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBannersQuery, GetBannersQueryVariables>(GetBannersDocument, options);
        }
export type GetBannersQueryHookResult = ReturnType<typeof useGetBannersQuery>;
export type GetBannersLazyQueryHookResult = ReturnType<typeof useGetBannersLazyQuery>;
export type GetBannersQueryResult = Apollo.QueryResult<GetBannersQuery, GetBannersQueryVariables>;
export const GetBannersRegistrationDocument = gql`
    query GetBannersRegistration {
  banners(orderBy: createdAt_DESC, stage: DRAFT, where: {deleted: false}) {
    id
    title
    content
    link
    deleted
    category
    photo {
      id
      url
    }
    createdAt
  }
}
    `;

/**
 * __useGetBannersRegistrationQuery__
 *
 * To run a query within a React component, call `useGetBannersRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannersRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannersRegistrationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBannersRegistrationQuery(baseOptions?: Apollo.QueryHookOptions<GetBannersRegistrationQuery, GetBannersRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBannersRegistrationQuery, GetBannersRegistrationQueryVariables>(GetBannersRegistrationDocument, options);
      }
export function useGetBannersRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBannersRegistrationQuery, GetBannersRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBannersRegistrationQuery, GetBannersRegistrationQueryVariables>(GetBannersRegistrationDocument, options);
        }
export type GetBannersRegistrationQueryHookResult = ReturnType<typeof useGetBannersRegistrationQuery>;
export type GetBannersRegistrationLazyQueryHookResult = ReturnType<typeof useGetBannersRegistrationLazyQuery>;
export type GetBannersRegistrationQueryResult = Apollo.QueryResult<GetBannersRegistrationQuery, GetBannersRegistrationQueryVariables>;
export const GetBannersCategoriesDocument = gql`
    query GetBannersCategories {
  __type(name: "NewsCategory") {
    enumValues {
      name
    }
  }
}
    `;

/**
 * __useGetBannersCategoriesQuery__
 *
 * To run a query within a React component, call `useGetBannersCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBannersCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBannersCategoriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetBannersCategoriesQuery(baseOptions?: Apollo.QueryHookOptions<GetBannersCategoriesQuery, GetBannersCategoriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetBannersCategoriesQuery, GetBannersCategoriesQueryVariables>(GetBannersCategoriesDocument, options);
      }
export function useGetBannersCategoriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetBannersCategoriesQuery, GetBannersCategoriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetBannersCategoriesQuery, GetBannersCategoriesQueryVariables>(GetBannersCategoriesDocument, options);
        }
export type GetBannersCategoriesQueryHookResult = ReturnType<typeof useGetBannersCategoriesQuery>;
export type GetBannersCategoriesLazyQueryHookResult = ReturnType<typeof useGetBannersCategoriesLazyQuery>;
export type GetBannersCategoriesQueryResult = Apollo.QueryResult<GetBannersCategoriesQuery, GetBannersCategoriesQueryVariables>;
export const GetCalendarsDocument = gql`
    query GetCalendars {
  calendars(
    orderBy: date_ASC
    where: {active: true, deleted: false}
    stage: PUBLISHED
  ) {
    id
    track
    round
    active
    deleted
    grid
    description
    date
    link
    flag {
      url
    }
  }
}
    `;

/**
 * __useGetCalendarsQuery__
 *
 * To run a query within a React component, call `useGetCalendarsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCalendarsQuery(baseOptions?: Apollo.QueryHookOptions<GetCalendarsQuery, GetCalendarsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarsQuery, GetCalendarsQueryVariables>(GetCalendarsDocument, options);
      }
export function useGetCalendarsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarsQuery, GetCalendarsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarsQuery, GetCalendarsQueryVariables>(GetCalendarsDocument, options);
        }
export type GetCalendarsQueryHookResult = ReturnType<typeof useGetCalendarsQuery>;
export type GetCalendarsLazyQueryHookResult = ReturnType<typeof useGetCalendarsLazyQuery>;
export type GetCalendarsQueryResult = Apollo.QueryResult<GetCalendarsQuery, GetCalendarsQueryVariables>;
export const GetCalendarsRegistrationDocument = gql`
    query GetCalendarsRegistration {
  calendars(orderBy: date_ASC, stage: DRAFT, where: {deleted: false}) {
    id
    track
    round
    active
    grid
    deleted
    description
    date
    link
    flag {
      url
    }
  }
}
    `;

/**
 * __useGetCalendarsRegistrationQuery__
 *
 * To run a query within a React component, call `useGetCalendarsRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCalendarsRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCalendarsRegistrationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCalendarsRegistrationQuery(baseOptions?: Apollo.QueryHookOptions<GetCalendarsRegistrationQuery, GetCalendarsRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCalendarsRegistrationQuery, GetCalendarsRegistrationQueryVariables>(GetCalendarsRegistrationDocument, options);
      }
export function useGetCalendarsRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCalendarsRegistrationQuery, GetCalendarsRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCalendarsRegistrationQuery, GetCalendarsRegistrationQueryVariables>(GetCalendarsRegistrationDocument, options);
        }
export type GetCalendarsRegistrationQueryHookResult = ReturnType<typeof useGetCalendarsRegistrationQuery>;
export type GetCalendarsRegistrationLazyQueryHookResult = ReturnType<typeof useGetCalendarsRegistrationLazyQuery>;
export type GetCalendarsRegistrationQueryResult = Apollo.QueryResult<GetCalendarsRegistrationQuery, GetCalendarsRegistrationQueryVariables>;
export const GetHallsOfFameDocument = gql`
    query GetHallsOfFame {
  hallsOfFame(orderBy: createdAt_DESC, where: {deleted: false}) {
    id
    season
    deleted
    photo {
      url
    }
  }
}
    `;

/**
 * __useGetHallsOfFameQuery__
 *
 * To run a query within a React component, call `useGetHallsOfFameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHallsOfFameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHallsOfFameQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHallsOfFameQuery(baseOptions?: Apollo.QueryHookOptions<GetHallsOfFameQuery, GetHallsOfFameQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHallsOfFameQuery, GetHallsOfFameQueryVariables>(GetHallsOfFameDocument, options);
      }
export function useGetHallsOfFameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHallsOfFameQuery, GetHallsOfFameQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHallsOfFameQuery, GetHallsOfFameQueryVariables>(GetHallsOfFameDocument, options);
        }
export type GetHallsOfFameQueryHookResult = ReturnType<typeof useGetHallsOfFameQuery>;
export type GetHallsOfFameLazyQueryHookResult = ReturnType<typeof useGetHallsOfFameLazyQuery>;
export type GetHallsOfFameQueryResult = Apollo.QueryResult<GetHallsOfFameQuery, GetHallsOfFameQueryVariables>;
export const GetHallsOfFameRegistrationDocument = gql`
    query GetHallsOfFameRegistration {
  hallsOfFame(orderBy: createdAt_DESC, stage: DRAFT, where: {deleted: false}) {
    id
    season
    deleted
    photo {
      url
    }
  }
}
    `;

/**
 * __useGetHallsOfFameRegistrationQuery__
 *
 * To run a query within a React component, call `useGetHallsOfFameRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetHallsOfFameRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetHallsOfFameRegistrationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetHallsOfFameRegistrationQuery(baseOptions?: Apollo.QueryHookOptions<GetHallsOfFameRegistrationQuery, GetHallsOfFameRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetHallsOfFameRegistrationQuery, GetHallsOfFameRegistrationQueryVariables>(GetHallsOfFameRegistrationDocument, options);
      }
export function useGetHallsOfFameRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetHallsOfFameRegistrationQuery, GetHallsOfFameRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetHallsOfFameRegistrationQuery, GetHallsOfFameRegistrationQueryVariables>(GetHallsOfFameRegistrationDocument, options);
        }
export type GetHallsOfFameRegistrationQueryHookResult = ReturnType<typeof useGetHallsOfFameRegistrationQuery>;
export type GetHallsOfFameRegistrationLazyQueryHookResult = ReturnType<typeof useGetHallsOfFameRegistrationLazyQuery>;
export type GetHallsOfFameRegistrationQueryResult = Apollo.QueryResult<GetHallsOfFameRegistrationQuery, GetHallsOfFameRegistrationQueryVariables>;
export const GetPartnersDocument = gql`
    query GetPartners {
  partners(where: {active: true, deleted: false}, orderBy: publishedAt_ASC) {
    id
    name
    altText
    deleted
    image {
      url
    }
    footerLogo {
      url
    }
    link
    active
  }
}
    `;

/**
 * __useGetPartnersQuery__
 *
 * To run a query within a React component, call `useGetPartnersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPartnersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPartnersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPartnersQuery(baseOptions?: Apollo.QueryHookOptions<GetPartnersQuery, GetPartnersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetPartnersQuery, GetPartnersQueryVariables>(GetPartnersDocument, options);
      }
export function useGetPartnersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPartnersQuery, GetPartnersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetPartnersQuery, GetPartnersQueryVariables>(GetPartnersDocument, options);
        }
export type GetPartnersQueryHookResult = ReturnType<typeof useGetPartnersQuery>;
export type GetPartnersLazyQueryHookResult = ReturnType<typeof useGetPartnersLazyQuery>;
export type GetPartnersQueryResult = Apollo.QueryResult<GetPartnersQuery, GetPartnersQueryVariables>;
export const GetSeasonRoundsDocument = gql`
    query GetSeasonRounds($slug: String!) {
  rounds(where: {season: {slug: $slug}}, stage: PUBLISHED, orderBy: date_ASC) {
    id
    name
    link
    date
    track {
      id
      name
      circuit
      location
      uniqueName
      flag {
        url
      }
    }
  }
}
    `;

/**
 * __useGetSeasonRoundsQuery__
 *
 * To run a query within a React component, call `useGetSeasonRoundsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonRoundsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonRoundsQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetSeasonRoundsQuery(baseOptions: Apollo.QueryHookOptions<GetSeasonRoundsQuery, GetSeasonRoundsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeasonRoundsQuery, GetSeasonRoundsQueryVariables>(GetSeasonRoundsDocument, options);
      }
export function useGetSeasonRoundsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeasonRoundsQuery, GetSeasonRoundsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeasonRoundsQuery, GetSeasonRoundsQueryVariables>(GetSeasonRoundsDocument, options);
        }
export type GetSeasonRoundsQueryHookResult = ReturnType<typeof useGetSeasonRoundsQuery>;
export type GetSeasonRoundsLazyQueryHookResult = ReturnType<typeof useGetSeasonRoundsLazyQuery>;
export type GetSeasonRoundsQueryResult = Apollo.QueryResult<GetSeasonRoundsQuery, GetSeasonRoundsQueryVariables>;
export const GetDriversDocument = gql`
    query GetDrivers {
  drivers(where: {deleted: false}) {
    id
    grid
    name
    class
    number
    stream
    deleted
    photo {
      url
    }
    badgeTitle
    badge {
      url
    }
    city
    equipment
    phone
    team {
      name
      color {
        hex
      }
      photo {
        url
      }
    }
  }
}
    `;

/**
 * __useGetDriversQuery__
 *
 * To run a query within a React component, call `useGetDriversQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDriversQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDriversQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDriversQuery(baseOptions?: Apollo.QueryHookOptions<GetDriversQuery, GetDriversQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDriversQuery, GetDriversQueryVariables>(GetDriversDocument, options);
      }
export function useGetDriversLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDriversQuery, GetDriversQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDriversQuery, GetDriversQueryVariables>(GetDriversDocument, options);
        }
export type GetDriversQueryHookResult = ReturnType<typeof useGetDriversQuery>;
export type GetDriversLazyQueryHookResult = ReturnType<typeof useGetDriversLazyQuery>;
export type GetDriversQueryResult = Apollo.QueryResult<GetDriversQuery, GetDriversQueryVariables>;
export const GetDriversRegistrationDocument = gql`
    query GetDriversRegistration {
  drivers(orderBy: name_ASC, stage: DRAFT, where: {deleted: false}) {
    id
    grid
    class
    name
    number
    stream
    deleted
    photo {
      url
    }
    badgeTitle
    badge {
      url
    }
    city
    equipment
    phone
    team {
      name
      color {
        hex
      }
      photo {
        url
      }
    }
  }
}
    `;

/**
 * __useGetDriversRegistrationQuery__
 *
 * To run a query within a React component, call `useGetDriversRegistrationQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDriversRegistrationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDriversRegistrationQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDriversRegistrationQuery(baseOptions?: Apollo.QueryHookOptions<GetDriversRegistrationQuery, GetDriversRegistrationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDriversRegistrationQuery, GetDriversRegistrationQueryVariables>(GetDriversRegistrationDocument, options);
      }
export function useGetDriversRegistrationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDriversRegistrationQuery, GetDriversRegistrationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDriversRegistrationQuery, GetDriversRegistrationQueryVariables>(GetDriversRegistrationDocument, options);
        }
export type GetDriversRegistrationQueryHookResult = ReturnType<typeof useGetDriversRegistrationQuery>;
export type GetDriversRegistrationLazyQueryHookResult = ReturnType<typeof useGetDriversRegistrationLazyQuery>;
export type GetDriversRegistrationQueryResult = Apollo.QueryResult<GetDriversRegistrationQuery, GetDriversRegistrationQueryVariables>;
export const GridOptionsDocument = gql`
    query GridOptions {
  __type(name: "Grid") {
    enumValues {
      name
    }
  }
}
    `;

/**
 * __useGridOptionsQuery__
 *
 * To run a query within a React component, call `useGridOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGridOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGridOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGridOptionsQuery(baseOptions?: Apollo.QueryHookOptions<GridOptionsQuery, GridOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GridOptionsQuery, GridOptionsQueryVariables>(GridOptionsDocument, options);
      }
export function useGridOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GridOptionsQuery, GridOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GridOptionsQuery, GridOptionsQueryVariables>(GridOptionsDocument, options);
        }
export type GridOptionsQueryHookResult = ReturnType<typeof useGridOptionsQuery>;
export type GridOptionsLazyQueryHookResult = ReturnType<typeof useGridOptionsLazyQuery>;
export type GridOptionsQueryResult = Apollo.QueryResult<GridOptionsQuery, GridOptionsQueryVariables>;
export const ClassOptionsDocument = gql`
    query ClassOptions {
  __type(name: "Class") {
    enumValues {
      name
    }
  }
}
    `;

/**
 * __useClassOptionsQuery__
 *
 * To run a query within a React component, call `useClassOptionsQuery` and pass it any options that fit your needs.
 * When your component renders, `useClassOptionsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useClassOptionsQuery({
 *   variables: {
 *   },
 * });
 */
export function useClassOptionsQuery(baseOptions?: Apollo.QueryHookOptions<ClassOptionsQuery, ClassOptionsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ClassOptionsQuery, ClassOptionsQueryVariables>(ClassOptionsDocument, options);
      }
export function useClassOptionsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ClassOptionsQuery, ClassOptionsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ClassOptionsQuery, ClassOptionsQueryVariables>(ClassOptionsDocument, options);
        }
export type ClassOptionsQueryHookResult = ReturnType<typeof useClassOptionsQuery>;
export type ClassOptionsLazyQueryHookResult = ReturnType<typeof useClassOptionsLazyQuery>;
export type ClassOptionsQueryResult = Apollo.QueryResult<ClassOptionsQuery, ClassOptionsQueryVariables>;
export const GetRoundResultsDocument = gql`
    query GetRoundResults($id: ID!) {
  round(where: {id: $id}, stage: PUBLISHED) {
    id
    name
    date
    link
    season {
      name
    }
    track {
      id
      name
      circuit
      location
      flag {
        url
      }
    }
    results
  }
}
    `;

/**
 * __useGetRoundResultsQuery__
 *
 * To run a query within a React component, call `useGetRoundResultsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetRoundResultsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetRoundResultsQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetRoundResultsQuery(baseOptions: Apollo.QueryHookOptions<GetRoundResultsQuery, GetRoundResultsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetRoundResultsQuery, GetRoundResultsQueryVariables>(GetRoundResultsDocument, options);
      }
export function useGetRoundResultsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetRoundResultsQuery, GetRoundResultsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetRoundResultsQuery, GetRoundResultsQueryVariables>(GetRoundResultsDocument, options);
        }
export type GetRoundResultsQueryHookResult = ReturnType<typeof useGetRoundResultsQuery>;
export type GetRoundResultsLazyQueryHookResult = ReturnType<typeof useGetRoundResultsLazyQuery>;
export type GetRoundResultsQueryResult = Apollo.QueryResult<GetRoundResultsQuery, GetRoundResultsQueryVariables>;
export const GetSeasonsDocument = gql`
    query GetSeasons {
  seasons(orderBy: startDate_DESC) {
    id
    name
    year
    slug
  }
}
    `;

/**
 * __useGetSeasonsQuery__
 *
 * To run a query within a React component, call `useGetSeasonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSeasonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSeasonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetSeasonsQuery(baseOptions?: Apollo.QueryHookOptions<GetSeasonsQuery, GetSeasonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(GetSeasonsDocument, options);
      }
export function useGetSeasonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSeasonsQuery, GetSeasonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetSeasonsQuery, GetSeasonsQueryVariables>(GetSeasonsDocument, options);
        }
export type GetSeasonsQueryHookResult = ReturnType<typeof useGetSeasonsQuery>;
export type GetSeasonsLazyQueryHookResult = ReturnType<typeof useGetSeasonsLazyQuery>;
export type GetSeasonsQueryResult = Apollo.QueryResult<GetSeasonsQuery, GetSeasonsQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  drivers(stage: PUBLISHED) {
    id
    name
    number
    stream
    deleted
    city
    equipment
    grid
    class
    team {
      name
      color {
        hex
      }
      photo {
        url
      }
    }
    photo {
      url
    }
    badge {
      url
    }
    badgeTitle
  }
  teams(stage: PUBLISHED) {
    id
    name
    class
    deleted
    color {
      hex
    }
    photo {
      url
    }
  }
}
    `;

/**
 * __useGetTeamsQuery__
 *
 * To run a query within a React component, call `useGetTeamsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
      }
export function useGetTeamsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamsQuery, GetTeamsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamsQuery, GetTeamsQueryVariables>(GetTeamsDocument, options);
        }
export type GetTeamsQueryHookResult = ReturnType<typeof useGetTeamsQuery>;
export type GetTeamsLazyQueryHookResult = ReturnType<typeof useGetTeamsLazyQuery>;
export type GetTeamsQueryResult = Apollo.QueryResult<GetTeamsQuery, GetTeamsQueryVariables>;
export const GetStatsDataDocument = gql`
    query GetStatsData {
  datas(orderBy: publishedAt_DESC, first: 2, where: {deleted: false}) {
    id
    grid
    csv {
      url
    }
  }
}
    `;

/**
 * __useGetStatsDataQuery__
 *
 * To run a query within a React component, call `useGetStatsDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatsDataQuery(baseOptions?: Apollo.QueryHookOptions<GetStatsDataQuery, GetStatsDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatsDataQuery, GetStatsDataQueryVariables>(GetStatsDataDocument, options);
      }
export function useGetStatsDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsDataQuery, GetStatsDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatsDataQuery, GetStatsDataQueryVariables>(GetStatsDataDocument, options);
        }
export type GetStatsDataQueryHookResult = ReturnType<typeof useGetStatsDataQuery>;
export type GetStatsDataLazyQueryHookResult = ReturnType<typeof useGetStatsDataLazyQuery>;
export type GetStatsDataQueryResult = Apollo.QueryResult<GetStatsDataQuery, GetStatsDataQueryVariables>;
export const GetDataDocument = gql`
    query GetData {
  datas(orderBy: publishedAt_DESC, where: {deleted: false}) {
    id
    grid
    deleted
    createdAt
    csv {
      url
    }
  }
}
    `;

/**
 * __useGetDataQuery__
 *
 * To run a query within a React component, call `useGetDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDataQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDataQuery(baseOptions?: Apollo.QueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDataQuery, GetDataQueryVariables>(GetDataDocument, options);
      }
export function useGetDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDataQuery, GetDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDataQuery, GetDataQueryVariables>(GetDataDocument, options);
        }
export type GetDataQueryHookResult = ReturnType<typeof useGetDataQuery>;
export type GetDataLazyQueryHookResult = ReturnType<typeof useGetDataLazyQuery>;
export type GetDataQueryResult = Apollo.QueryResult<GetDataQuery, GetDataQueryVariables>;
export const GetStatsDataADocument = gql`
    query GetStatsDataA {
  datas(orderBy: publishedAt_DESC, first: 2, where: {grid: gridA}) {
    id
    csv {
      url
    }
    grid
  }
}
    `;

/**
 * __useGetStatsDataAQuery__
 *
 * To run a query within a React component, call `useGetStatsDataAQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsDataAQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsDataAQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatsDataAQuery(baseOptions?: Apollo.QueryHookOptions<GetStatsDataAQuery, GetStatsDataAQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatsDataAQuery, GetStatsDataAQueryVariables>(GetStatsDataADocument, options);
      }
export function useGetStatsDataALazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsDataAQuery, GetStatsDataAQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatsDataAQuery, GetStatsDataAQueryVariables>(GetStatsDataADocument, options);
        }
export type GetStatsDataAQueryHookResult = ReturnType<typeof useGetStatsDataAQuery>;
export type GetStatsDataALazyQueryHookResult = ReturnType<typeof useGetStatsDataALazyQuery>;
export type GetStatsDataAQueryResult = Apollo.QueryResult<GetStatsDataAQuery, GetStatsDataAQueryVariables>;
export const GetStatsDataBDocument = gql`
    query GetStatsDataB {
  datas(orderBy: publishedAt_DESC, first: 2, where: {grid: gridB}) {
    id
    csv {
      url
    }
    grid
  }
}
    `;

/**
 * __useGetStatsDataBQuery__
 *
 * To run a query within a React component, call `useGetStatsDataBQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetStatsDataBQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetStatsDataBQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetStatsDataBQuery(baseOptions?: Apollo.QueryHookOptions<GetStatsDataBQuery, GetStatsDataBQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetStatsDataBQuery, GetStatsDataBQueryVariables>(GetStatsDataBDocument, options);
      }
export function useGetStatsDataBLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetStatsDataBQuery, GetStatsDataBQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetStatsDataBQuery, GetStatsDataBQueryVariables>(GetStatsDataBDocument, options);
        }
export type GetStatsDataBQueryHookResult = ReturnType<typeof useGetStatsDataBQuery>;
export type GetStatsDataBLazyQueryHookResult = ReturnType<typeof useGetStatsDataBLazyQuery>;
export type GetStatsDataBQueryResult = Apollo.QueryResult<GetStatsDataBQuery, GetStatsDataBQueryVariables>;