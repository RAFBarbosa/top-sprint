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
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Asset>;
  /** The file name */
  fileName: Scalars['String'];
  /** The file handle */
  handle: Scalars['String'];
  /** The height of the file */
  height?: Maybe<Scalars['Float']>;
  /** List of Asset versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  /** System Locale field */
  locale: Locale;
  /** Get the other localizations for this document */
  localizations: Array<Asset>;
  /** The mime type of the file */
  mimeType?: Maybe<Scalars['String']>;
  photoDriver: Array<Driver>;
  photoDriverStanding: Array<DriverStanding>;
  photoHallOfFame: Array<HallOfFame>;
  photoTeam: Array<Team>;
  photoTeamStanding: Array<TeamStanding>;
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
  /** Get the url for the asset with provided transformations applied. */
  url: Scalars['String'];
  /** The file width */
  width?: Maybe<Scalars['Float']>;
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
export type AssetDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


/** Asset system model */
export type AssetHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


/** Asset system model */
export type AssetLocalizationsArgs = {
  includeCurrent?: Scalars['Boolean'];
  locales?: Array<Locale>;
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
export type AssetPhotoDriverStandingArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<DriverStandingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverStandingWhereInput>;
};


/** Asset system model */
export type AssetPhotoHallOfFameArgs = {
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
export type AssetPhotoTeamStandingArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<TeamStandingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamStandingWhereInput>;
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
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  /** Inline mutations for managing document localizations excluding the default locale */
  localizations?: InputMaybe<AssetCreateLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  photoDriver?: InputMaybe<DriverCreateManyInlineInput>;
  photoDriverStanding?: InputMaybe<DriverStandingCreateManyInlineInput>;
  photoHallOfFame?: InputMaybe<HallOfFameCreateManyInlineInput>;
  photoTeam?: InputMaybe<TeamCreateManyInlineInput>;
  photoTeamStanding?: InputMaybe<TeamStandingCreateManyInlineInput>;
  size?: InputMaybe<Scalars['Float']>;
  slug?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetCreateLocalizationDataInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  fileName: Scalars['String'];
  handle: Scalars['String'];
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  width?: InputMaybe<Scalars['Float']>;
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
  documentInStages_every?: InputMaybe<AssetWhereStageInput>;
  documentInStages_none?: InputMaybe<AssetWhereStageInput>;
  documentInStages_some?: InputMaybe<AssetWhereStageInput>;
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
  photoDriverStanding_every?: InputMaybe<DriverStandingWhereInput>;
  photoDriverStanding_none?: InputMaybe<DriverStandingWhereInput>;
  photoDriverStanding_some?: InputMaybe<DriverStandingWhereInput>;
  photoDriver_every?: InputMaybe<DriverWhereInput>;
  photoDriver_none?: InputMaybe<DriverWhereInput>;
  photoDriver_some?: InputMaybe<DriverWhereInput>;
  photoHallOfFame_every?: InputMaybe<HallOfFameWhereInput>;
  photoHallOfFame_none?: InputMaybe<HallOfFameWhereInput>;
  photoHallOfFame_some?: InputMaybe<HallOfFameWhereInput>;
  photoTeamStanding_every?: InputMaybe<TeamStandingWhereInput>;
  photoTeamStanding_none?: InputMaybe<TeamStandingWhereInput>;
  photoTeamStanding_some?: InputMaybe<TeamStandingWhereInput>;
  photoTeam_every?: InputMaybe<TeamWhereInput>;
  photoTeam_none?: InputMaybe<TeamWhereInput>;
  photoTeam_some?: InputMaybe<TeamWhereInput>;
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

/** Transformations for Assets */
export type AssetTransformationInput = {
  document?: InputMaybe<DocumentTransformationInput>;
  image?: InputMaybe<ImageTransformationInput>;
  /** Pass true if you want to validate the passed transformation parameters */
  validateOptions?: InputMaybe<Scalars['Boolean']>;
};

export type AssetUpdateInput = {
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Manage document localizations */
  localizations?: InputMaybe<AssetUpdateLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  photoDriver?: InputMaybe<DriverUpdateManyInlineInput>;
  photoDriverStanding?: InputMaybe<DriverStandingUpdateManyInlineInput>;
  photoHallOfFame?: InputMaybe<HallOfFameUpdateManyInlineInput>;
  photoTeam?: InputMaybe<TeamUpdateManyInlineInput>;
  photoTeamStanding?: InputMaybe<TeamStandingUpdateManyInlineInput>;
  size?: InputMaybe<Scalars['Float']>;
  slug?: InputMaybe<Scalars['String']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  handle?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
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
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  /** Optional updates to localizations */
  localizations?: InputMaybe<AssetUpdateManyLocalizationsInput>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationDataInput = {
  fileName?: InputMaybe<Scalars['String']>;
  height?: InputMaybe<Scalars['Float']>;
  mimeType?: InputMaybe<Scalars['String']>;
  size?: InputMaybe<Scalars['Float']>;
  width?: InputMaybe<Scalars['Float']>;
};

export type AssetUpdateManyLocalizationInput = {
  data: AssetUpdateManyLocalizationDataInput;
  locale: Locale;
};

export type AssetUpdateManyLocalizationsInput = {
  /** Localizations to update */
  update?: InputMaybe<Array<AssetUpdateManyLocalizationInput>>;
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
  photoDriverStanding_every?: InputMaybe<DriverStandingWhereInput>;
  photoDriverStanding_none?: InputMaybe<DriverStandingWhereInput>;
  photoDriverStanding_some?: InputMaybe<DriverStandingWhereInput>;
  photoDriver_every?: InputMaybe<DriverWhereInput>;
  photoDriver_none?: InputMaybe<DriverWhereInput>;
  photoDriver_some?: InputMaybe<DriverWhereInput>;
  photoHallOfFame_every?: InputMaybe<HallOfFameWhereInput>;
  photoHallOfFame_none?: InputMaybe<HallOfFameWhereInput>;
  photoHallOfFame_some?: InputMaybe<HallOfFameWhereInput>;
  photoTeamStanding_every?: InputMaybe<TeamStandingWhereInput>;
  photoTeamStanding_none?: InputMaybe<TeamStandingWhereInput>;
  photoTeamStanding_some?: InputMaybe<TeamStandingWhereInput>;
  photoTeam_every?: InputMaybe<TeamWhereInput>;
  photoTeam_none?: InputMaybe<TeamWhereInput>;
  photoTeam_some?: InputMaybe<TeamWhereInput>;
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

export type BatchPayload = {
  __typename?: 'BatchPayload';
  /** The number of nodes that have been affected by the Batch operation. */
  count: Scalars['Long'];
};

export type Challenge = Entity & Node & {
  __typename?: 'Challenge';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Challenge>;
  /** List of Challenge versions */
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
  url: Scalars['String'];
};


export type ChallengeCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ChallengeDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type ChallengeHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type ChallengePublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type ChallengeScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type ChallengeUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type ChallengeConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: ChallengeWhereUniqueInput;
};

/** A connection to a list of items. */
export type ChallengeConnection = {
  __typename?: 'ChallengeConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<ChallengeEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type ChallengeCreateInput = {
  cl4e8k4ev0anm01xu7gc87fn9?: InputMaybe<LessonCreateManyInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  url: Scalars['String'];
};

export type ChallengeCreateManyInlineInput = {
  /** Connect multiple existing Challenge documents */
  connect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  /** Create and connect multiple existing Challenge documents */
  create?: InputMaybe<Array<ChallengeCreateInput>>;
};

export type ChallengeCreateOneInlineInput = {
  /** Connect one existing Challenge document */
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  /** Create and connect one Challenge document */
  create?: InputMaybe<ChallengeCreateInput>;
};

/** An edge in a connection. */
export type ChallengeEdge = {
  __typename?: 'ChallengeEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Challenge;
};

/** Identifies documents */
export type ChallengeManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ChallengeWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ChallengeWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ChallengeWhereInput>>;
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
  documentInStages_every?: InputMaybe<ChallengeWhereStageInput>;
  documentInStages_none?: InputMaybe<ChallengeWhereStageInput>;
  documentInStages_some?: InputMaybe<ChallengeWhereStageInput>;
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
  url?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  url_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: InputMaybe<Scalars['String']>;
};

export enum ChallengeOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  UrlAsc = 'url_ASC',
  UrlDesc = 'url_DESC'
}

export type ChallengeUpdateInput = {
  cl4e8k4ev0anm01xu7gc87fn9?: InputMaybe<LessonUpdateManyInlineInput>;
  url?: InputMaybe<Scalars['String']>;
};

export type ChallengeUpdateManyInlineInput = {
  /** Connect multiple existing Challenge documents */
  connect?: InputMaybe<Array<ChallengeConnectInput>>;
  /** Create and connect multiple Challenge documents */
  create?: InputMaybe<Array<ChallengeCreateInput>>;
  /** Delete multiple Challenge documents */
  delete?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  /** Disconnect multiple Challenge documents */
  disconnect?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Challenge documents */
  set?: InputMaybe<Array<ChallengeWhereUniqueInput>>;
  /** Update multiple Challenge documents */
  update?: InputMaybe<Array<ChallengeUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Challenge documents */
  upsert?: InputMaybe<Array<ChallengeUpsertWithNestedWhereUniqueInput>>;
};

export type ChallengeUpdateManyInput = {
  url?: InputMaybe<Scalars['String']>;
};

export type ChallengeUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: ChallengeUpdateManyInput;
  /** Document search */
  where: ChallengeWhereInput;
};

export type ChallengeUpdateOneInlineInput = {
  /** Connect existing Challenge document */
  connect?: InputMaybe<ChallengeWhereUniqueInput>;
  /** Create and connect one Challenge document */
  create?: InputMaybe<ChallengeCreateInput>;
  /** Delete currently connected Challenge document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Challenge document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Challenge document */
  update?: InputMaybe<ChallengeUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Challenge document */
  upsert?: InputMaybe<ChallengeUpsertWithNestedWhereUniqueInput>;
};

export type ChallengeUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: ChallengeUpdateInput;
  /** Unique document search */
  where: ChallengeWhereUniqueInput;
};

export type ChallengeUpsertInput = {
  /** Create document if it didn't exist */
  create: ChallengeCreateInput;
  /** Update document if it exists */
  update: ChallengeUpdateInput;
};

export type ChallengeUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: ChallengeUpsertInput;
  /** Unique document search */
  where: ChallengeWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type ChallengeWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type ChallengeWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ChallengeWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ChallengeWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ChallengeWhereInput>>;
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
  documentInStages_every?: InputMaybe<ChallengeWhereStageInput>;
  documentInStages_none?: InputMaybe<ChallengeWhereStageInput>;
  documentInStages_some?: InputMaybe<ChallengeWhereStageInput>;
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
  url?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  url_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  url_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  url_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  url_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  url_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  url_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  url_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  url_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  url_starts_with?: InputMaybe<Scalars['String']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type ChallengeWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<ChallengeWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<ChallengeWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<ChallengeWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<ChallengeWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Challenge record uniquely */
export type ChallengeWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

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

export enum DocumentFileTypes {
  Doc = 'doc',
  Docx = 'docx',
  Html = 'html',
  Jpg = 'jpg',
  Odp = 'odp',
  Ods = 'ods',
  Odt = 'odt',
  Pdf = 'pdf',
  Png = 'png',
  Ppt = 'ppt',
  Pptx = 'pptx',
  Svg = 'svg',
  Txt = 'txt',
  Webp = 'webp',
  Xls = 'xls',
  Xlsx = 'xlsx'
}

export type DocumentOutputInput = {
  /**
   * Transforms a document into a desired file type.
   * See this matrix for format support:
   *
   * PDF:	jpg, odp, ods, odt, png, svg, txt, and webp
   * DOC:	docx, html, jpg, odt, pdf, png, svg, txt, and webp
   * DOCX:	doc, html, jpg, odt, pdf, png, svg, txt, and webp
   * ODT:	doc, docx, html, jpg, pdf, png, svg, txt, and webp
   * XLS:	jpg, pdf, ods, png, svg, xlsx, and webp
   * XLSX:	jpg, pdf, ods, png, svg, xls, and webp
   * ODS:	jpg, pdf, png, xls, svg, xlsx, and webp
   * PPT:	jpg, odp, pdf, png, svg, pptx, and webp
   * PPTX:	jpg, odp, pdf, png, svg, ppt, and webp
   * ODP:	jpg, pdf, png, ppt, svg, pptx, and webp
   * BMP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * GIF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * JPG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * PNG:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * WEBP:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * TIFF:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * AI:	    jpg, odp, ods, odt, pdf, png, svg, and webp
   * PSD:	jpg, odp, ods, odt, pdf, png, svg, and webp
   * SVG:	jpg, odp, ods, odt, pdf, png, and webp
   * HTML:	jpg, odt, pdf, svg, txt, and webp
   * TXT:	jpg, html, odt, pdf, svg, and webp
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
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Driver>;
  driverNumber?: Maybe<Scalars['String']>;
  /** List of Driver versions */
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
  team?: Maybe<Scalars['String']>;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
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
  createdAt?: InputMaybe<Scalars['DateTime']>;
  driverNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  team?: InputMaybe<Scalars['String']>;
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
  documentInStages_every?: InputMaybe<DriverWhereStageInput>;
  documentInStages_none?: InputMaybe<DriverWhereStageInput>;
  documentInStages_some?: InputMaybe<DriverWhereStageInput>;
  driverNumber?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  driverNumber_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  driverNumber_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  driverNumber_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  driverNumber_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  driverNumber_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  driverNumber_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  driverNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  driverNumber_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  driverNumber_starts_with?: InputMaybe<Scalars['String']>;
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
  team?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  team_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  team_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  team_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  team_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  team_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  team_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  team_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  team_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  team_starts_with?: InputMaybe<Scalars['String']>;
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
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DriverNumberAsc = 'driverNumber_ASC',
  DriverNumberDesc = 'driverNumber_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TeamAsc = 'team_ASC',
  TeamDesc = 'team_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type DriverStanding = Entity & Node & {
  __typename?: 'DriverStanding';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<DriverStanding>;
  /** List of DriverStanding versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  photo?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  round: Scalars['String'];
  scheduledIn: Array<ScheduledOperation>;
  season: Scalars['String'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type DriverStandingCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DriverStandingDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type DriverStandingHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type DriverStandingPhotoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DriverStandingPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type DriverStandingScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type DriverStandingUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type DriverStandingConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: DriverStandingWhereUniqueInput;
};

/** A connection to a list of items. */
export type DriverStandingConnection = {
  __typename?: 'DriverStandingConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<DriverStandingEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type DriverStandingCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  round: Scalars['String'];
  season: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type DriverStandingCreateManyInlineInput = {
  /** Connect multiple existing DriverStanding documents */
  connect?: InputMaybe<Array<DriverStandingWhereUniqueInput>>;
  /** Create and connect multiple existing DriverStanding documents */
  create?: InputMaybe<Array<DriverStandingCreateInput>>;
};

export type DriverStandingCreateOneInlineInput = {
  /** Connect one existing DriverStanding document */
  connect?: InputMaybe<DriverStandingWhereUniqueInput>;
  /** Create and connect one DriverStanding document */
  create?: InputMaybe<DriverStandingCreateInput>;
};

/** An edge in a connection. */
export type DriverStandingEdge = {
  __typename?: 'DriverStandingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: DriverStanding;
};

/** Identifies documents */
export type DriverStandingManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DriverStandingWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DriverStandingWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DriverStandingWhereInput>>;
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
  documentInStages_every?: InputMaybe<DriverStandingWhereStageInput>;
  documentInStages_none?: InputMaybe<DriverStandingWhereStageInput>;
  documentInStages_some?: InputMaybe<DriverStandingWhereStageInput>;
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

export enum DriverStandingOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RoundAsc = 'round_ASC',
  RoundDesc = 'round_DESC',
  SeasonAsc = 'season_ASC',
  SeasonDesc = 'season_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type DriverStandingUpdateInput = {
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
  round?: InputMaybe<Scalars['String']>;
  season?: InputMaybe<Scalars['String']>;
};

export type DriverStandingUpdateManyInlineInput = {
  /** Connect multiple existing DriverStanding documents */
  connect?: InputMaybe<Array<DriverStandingConnectInput>>;
  /** Create and connect multiple DriverStanding documents */
  create?: InputMaybe<Array<DriverStandingCreateInput>>;
  /** Delete multiple DriverStanding documents */
  delete?: InputMaybe<Array<DriverStandingWhereUniqueInput>>;
  /** Disconnect multiple DriverStanding documents */
  disconnect?: InputMaybe<Array<DriverStandingWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing DriverStanding documents */
  set?: InputMaybe<Array<DriverStandingWhereUniqueInput>>;
  /** Update multiple DriverStanding documents */
  update?: InputMaybe<Array<DriverStandingUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple DriverStanding documents */
  upsert?: InputMaybe<Array<DriverStandingUpsertWithNestedWhereUniqueInput>>;
};

export type DriverStandingUpdateManyInput = {
  round?: InputMaybe<Scalars['String']>;
  season?: InputMaybe<Scalars['String']>;
};

export type DriverStandingUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: DriverStandingUpdateManyInput;
  /** Document search */
  where: DriverStandingWhereInput;
};

export type DriverStandingUpdateOneInlineInput = {
  /** Connect existing DriverStanding document */
  connect?: InputMaybe<DriverStandingWhereUniqueInput>;
  /** Create and connect one DriverStanding document */
  create?: InputMaybe<DriverStandingCreateInput>;
  /** Delete currently connected DriverStanding document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected DriverStanding document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single DriverStanding document */
  update?: InputMaybe<DriverStandingUpdateWithNestedWhereUniqueInput>;
  /** Upsert single DriverStanding document */
  upsert?: InputMaybe<DriverStandingUpsertWithNestedWhereUniqueInput>;
};

export type DriverStandingUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: DriverStandingUpdateInput;
  /** Unique document search */
  where: DriverStandingWhereUniqueInput;
};

export type DriverStandingUpsertInput = {
  /** Create document if it didn't exist */
  create: DriverStandingCreateInput;
  /** Update document if it exists */
  update: DriverStandingUpdateInput;
};

export type DriverStandingUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: DriverStandingUpsertInput;
  /** Unique document search */
  where: DriverStandingWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type DriverStandingWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type DriverStandingWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DriverStandingWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DriverStandingWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DriverStandingWhereInput>>;
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
  documentInStages_every?: InputMaybe<DriverStandingWhereStageInput>;
  documentInStages_none?: InputMaybe<DriverStandingWhereStageInput>;
  documentInStages_some?: InputMaybe<DriverStandingWhereStageInput>;
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
export type DriverStandingWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<DriverStandingWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<DriverStandingWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<DriverStandingWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<DriverStandingWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References DriverStanding record uniquely */
export type DriverStandingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type DriverUpdateInput = {
  driverNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
  team?: InputMaybe<Scalars['String']>;
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
  name?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<Scalars['String']>;
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
  documentInStages_every?: InputMaybe<DriverWhereStageInput>;
  documentInStages_none?: InputMaybe<DriverWhereStageInput>;
  documentInStages_some?: InputMaybe<DriverWhereStageInput>;
  driverNumber?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  driverNumber_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  driverNumber_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  driverNumber_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  driverNumber_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  driverNumber_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  driverNumber_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  driverNumber_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  driverNumber_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  driverNumber_starts_with?: InputMaybe<Scalars['String']>;
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
  team?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  team_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  team_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  team_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  team_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  team_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  team_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  team_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  team_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  team_starts_with?: InputMaybe<Scalars['String']>;
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
  driverNumber?: InputMaybe<Scalars['String']>;
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
  Challenge = 'Challenge',
  Driver = 'Driver',
  DriverStanding = 'DriverStanding',
  HallOfFame = 'HallOfFame',
  Lesson = 'Lesson',
  /** Scheduled Operation system model */
  ScheduledOperation = 'ScheduledOperation',
  /** Scheduled Release system model */
  ScheduledRelease = 'ScheduledRelease',
  Teacher = 'Teacher',
  Team = 'Team',
  TeamStanding = 'TeamStanding',
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

export type HallOfFame = Entity & Node & {
  __typename?: 'HallOfFame';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<HallOfFame>;
  /** List of HallOfFame versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  photo?: Maybe<Asset>;
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
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
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
  photo?: InputMaybe<AssetCreateOneInlineInput>;
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
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
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

export type ImageResizeInput = {
  /** The default value for the fit parameter is fit:clip. */
  fit?: InputMaybe<ImageFit>;
  /** The height in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  height?: InputMaybe<Scalars['Int']>;
  /** The width in pixels to resize the image to. The value must be an integer from 1 to 10000. */
  width?: InputMaybe<Scalars['Int']>;
};

/** Transformations for Images */
export type ImageTransformationInput = {
  /** Resizes the image */
  resize?: InputMaybe<ImageResizeInput>;
};

export type Lesson = Entity & Node & {
  __typename?: 'Lesson';
  availableAt?: Maybe<Scalars['DateTime']>;
  challenge?: Maybe<Challenge>;
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  description?: Maybe<Scalars['String']>;
  /** Get the document in other stages */
  documentInStages: Array<Lesson>;
  /** List of Lesson versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  lessonType: LessonType;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  scheduledIn: Array<ScheduledOperation>;
  slug: Scalars['String'];
  /** System stage field */
  stage: Stage;
  teacher?: Maybe<Teacher>;
  title: Scalars['String'];
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
  /** The ID of the Youtube video. */
  videoId: Scalars['String'];
};


export type LessonChallengeArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LessonCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LessonDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type LessonHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type LessonPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LessonScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type LessonTeacherArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type LessonUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type LessonConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: LessonWhereUniqueInput;
};

/** A connection to a list of items. */
export type LessonConnection = {
  __typename?: 'LessonConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<LessonEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type LessonCreateInput = {
  availableAt?: InputMaybe<Scalars['DateTime']>;
  challenge?: InputMaybe<ChallengeCreateOneInlineInput>;
  createdAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  lessonType: LessonType;
  slug: Scalars['String'];
  teacher?: InputMaybe<TeacherCreateOneInlineInput>;
  title: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  videoId: Scalars['String'];
};

export type LessonCreateManyInlineInput = {
  /** Connect multiple existing Lesson documents */
  connect?: InputMaybe<Array<LessonWhereUniqueInput>>;
  /** Create and connect multiple existing Lesson documents */
  create?: InputMaybe<Array<LessonCreateInput>>;
};

export type LessonCreateOneInlineInput = {
  /** Connect one existing Lesson document */
  connect?: InputMaybe<LessonWhereUniqueInput>;
  /** Create and connect one Lesson document */
  create?: InputMaybe<LessonCreateInput>;
};

/** An edge in a connection. */
export type LessonEdge = {
  __typename?: 'LessonEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Lesson;
};

/** Identifies documents */
export type LessonManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LessonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LessonWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LessonWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  availableAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  availableAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  availableAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  availableAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  availableAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  availableAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  availableAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  availableAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  challenge?: InputMaybe<ChallengeWhereInput>;
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
  documentInStages_every?: InputMaybe<LessonWhereStageInput>;
  documentInStages_none?: InputMaybe<LessonWhereStageInput>;
  documentInStages_some?: InputMaybe<LessonWhereStageInput>;
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
  lessonType?: InputMaybe<LessonType>;
  /** All values that are contained in given list. */
  lessonType_in?: InputMaybe<Array<InputMaybe<LessonType>>>;
  /** Any other value that exists and is not equal to the given value. */
  lessonType_not?: InputMaybe<LessonType>;
  /** All values that are not contained in given list. */
  lessonType_not_in?: InputMaybe<Array<InputMaybe<LessonType>>>;
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
  teacher?: InputMaybe<TeacherWhereInput>;
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
  videoId?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  videoId_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  videoId_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  videoId_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  videoId_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  videoId_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  videoId_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  videoId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  videoId_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  videoId_starts_with?: InputMaybe<Scalars['String']>;
};

export enum LessonOrderByInput {
  AvailableAtAsc = 'availableAt_ASC',
  AvailableAtDesc = 'availableAt_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  DescriptionAsc = 'description_ASC',
  DescriptionDesc = 'description_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  LessonTypeAsc = 'lessonType_ASC',
  LessonTypeDesc = 'lessonType_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  SlugAsc = 'slug_ASC',
  SlugDesc = 'slug_DESC',
  TitleAsc = 'title_ASC',
  TitleDesc = 'title_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC',
  VideoIdAsc = 'videoId_ASC',
  VideoIdDesc = 'videoId_DESC'
}

export enum LessonType {
  Class = 'class',
  Live = 'live'
}

export type LessonUpdateInput = {
  availableAt?: InputMaybe<Scalars['DateTime']>;
  challenge?: InputMaybe<ChallengeUpdateOneInlineInput>;
  description?: InputMaybe<Scalars['String']>;
  lessonType?: InputMaybe<LessonType>;
  slug?: InputMaybe<Scalars['String']>;
  teacher?: InputMaybe<TeacherUpdateOneInlineInput>;
  title?: InputMaybe<Scalars['String']>;
  videoId?: InputMaybe<Scalars['String']>;
};

export type LessonUpdateManyInlineInput = {
  /** Connect multiple existing Lesson documents */
  connect?: InputMaybe<Array<LessonConnectInput>>;
  /** Create and connect multiple Lesson documents */
  create?: InputMaybe<Array<LessonCreateInput>>;
  /** Delete multiple Lesson documents */
  delete?: InputMaybe<Array<LessonWhereUniqueInput>>;
  /** Disconnect multiple Lesson documents */
  disconnect?: InputMaybe<Array<LessonWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Lesson documents */
  set?: InputMaybe<Array<LessonWhereUniqueInput>>;
  /** Update multiple Lesson documents */
  update?: InputMaybe<Array<LessonUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Lesson documents */
  upsert?: InputMaybe<Array<LessonUpsertWithNestedWhereUniqueInput>>;
};

export type LessonUpdateManyInput = {
  availableAt?: InputMaybe<Scalars['DateTime']>;
  description?: InputMaybe<Scalars['String']>;
  lessonType?: InputMaybe<LessonType>;
  title?: InputMaybe<Scalars['String']>;
  videoId?: InputMaybe<Scalars['String']>;
};

export type LessonUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: LessonUpdateManyInput;
  /** Document search */
  where: LessonWhereInput;
};

export type LessonUpdateOneInlineInput = {
  /** Connect existing Lesson document */
  connect?: InputMaybe<LessonWhereUniqueInput>;
  /** Create and connect one Lesson document */
  create?: InputMaybe<LessonCreateInput>;
  /** Delete currently connected Lesson document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Lesson document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Lesson document */
  update?: InputMaybe<LessonUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Lesson document */
  upsert?: InputMaybe<LessonUpsertWithNestedWhereUniqueInput>;
};

export type LessonUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: LessonUpdateInput;
  /** Unique document search */
  where: LessonWhereUniqueInput;
};

export type LessonUpsertInput = {
  /** Create document if it didn't exist */
  create: LessonCreateInput;
  /** Update document if it exists */
  update: LessonUpdateInput;
};

export type LessonUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: LessonUpsertInput;
  /** Unique document search */
  where: LessonWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type LessonWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type LessonWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LessonWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LessonWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LessonWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  availableAt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than the given value. */
  availableAt_gt?: InputMaybe<Scalars['DateTime']>;
  /** All values greater than or equal the given value. */
  availableAt_gte?: InputMaybe<Scalars['DateTime']>;
  /** All values that are contained in given list. */
  availableAt_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  /** All values less than the given value. */
  availableAt_lt?: InputMaybe<Scalars['DateTime']>;
  /** All values less than or equal the given value. */
  availableAt_lte?: InputMaybe<Scalars['DateTime']>;
  /** Any other value that exists and is not equal to the given value. */
  availableAt_not?: InputMaybe<Scalars['DateTime']>;
  /** All values that are not contained in given list. */
  availableAt_not_in?: InputMaybe<Array<InputMaybe<Scalars['DateTime']>>>;
  challenge?: InputMaybe<ChallengeWhereInput>;
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
  documentInStages_every?: InputMaybe<LessonWhereStageInput>;
  documentInStages_none?: InputMaybe<LessonWhereStageInput>;
  documentInStages_some?: InputMaybe<LessonWhereStageInput>;
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
  lessonType?: InputMaybe<LessonType>;
  /** All values that are contained in given list. */
  lessonType_in?: InputMaybe<Array<InputMaybe<LessonType>>>;
  /** Any other value that exists and is not equal to the given value. */
  lessonType_not?: InputMaybe<LessonType>;
  /** All values that are not contained in given list. */
  lessonType_not_in?: InputMaybe<Array<InputMaybe<LessonType>>>;
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
  teacher?: InputMaybe<TeacherWhereInput>;
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
  videoId?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  videoId_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  videoId_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  videoId_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  videoId_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  videoId_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  videoId_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  videoId_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  videoId_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  videoId_starts_with?: InputMaybe<Scalars['String']>;
};

/** The document in stages filter allows specifying a stage entry to cross compare the same document between different stages */
export type LessonWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<LessonWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<LessonWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<LessonWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<LessonWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Lesson record uniquely */
export type LessonWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
  slug?: InputMaybe<Scalars['String']>;
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
  /**
   * Create one asset
   * @deprecated Asset mutations will be overhauled soon
   */
  createAsset?: Maybe<Asset>;
  /** Create one challenge */
  createChallenge?: Maybe<Challenge>;
  /** Create one driver */
  createDriver?: Maybe<Driver>;
  /** Create one driverStanding */
  createDriverStanding?: Maybe<DriverStanding>;
  /** Create one hallOfFame */
  createHallOfFame?: Maybe<HallOfFame>;
  /** Create one lesson */
  createLesson?: Maybe<Lesson>;
  /** Create one scheduledRelease */
  createScheduledRelease?: Maybe<ScheduledRelease>;
  /** Create one teacher */
  createTeacher?: Maybe<Teacher>;
  /** Create one team */
  createTeam?: Maybe<Team>;
  /** Create one teamStanding */
  createTeamStanding?: Maybe<TeamStanding>;
  /** Delete one asset from _all_ existing stages. Returns deleted document. */
  deleteAsset?: Maybe<Asset>;
  /** Delete one challenge from _all_ existing stages. Returns deleted document. */
  deleteChallenge?: Maybe<Challenge>;
  /** Delete one driver from _all_ existing stages. Returns deleted document. */
  deleteDriver?: Maybe<Driver>;
  /** Delete one driverStanding from _all_ existing stages. Returns deleted document. */
  deleteDriverStanding?: Maybe<DriverStanding>;
  /** Delete one hallOfFame from _all_ existing stages. Returns deleted document. */
  deleteHallOfFame?: Maybe<HallOfFame>;
  /** Delete one lesson from _all_ existing stages. Returns deleted document. */
  deleteLesson?: Maybe<Lesson>;
  /**
   * Delete many Asset documents
   * @deprecated Please use the new paginated many mutation (deleteManyAssetsConnection)
   */
  deleteManyAssets: BatchPayload;
  /** Delete many Asset documents, return deleted documents */
  deleteManyAssetsConnection: AssetConnection;
  /**
   * Delete many Challenge documents
   * @deprecated Please use the new paginated many mutation (deleteManyChallengesConnection)
   */
  deleteManyChallenges: BatchPayload;
  /** Delete many Challenge documents, return deleted documents */
  deleteManyChallengesConnection: ChallengeConnection;
  /**
   * Delete many DriverStanding documents
   * @deprecated Please use the new paginated many mutation (deleteManyDriverStandingsConnection)
   */
  deleteManyDriverStandings: BatchPayload;
  /** Delete many DriverStanding documents, return deleted documents */
  deleteManyDriverStandingsConnection: DriverStandingConnection;
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
   * Delete many Lesson documents
   * @deprecated Please use the new paginated many mutation (deleteManyLessonsConnection)
   */
  deleteManyLessons: BatchPayload;
  /** Delete many Lesson documents, return deleted documents */
  deleteManyLessonsConnection: LessonConnection;
  /**
   * Delete many Teacher documents
   * @deprecated Please use the new paginated many mutation (deleteManyTeachersConnection)
   */
  deleteManyTeachers: BatchPayload;
  /** Delete many Teacher documents, return deleted documents */
  deleteManyTeachersConnection: TeacherConnection;
  /**
   * Delete many TeamStanding documents
   * @deprecated Please use the new paginated many mutation (deleteManyTeamStandingsConnection)
   */
  deleteManyTeamStandings: BatchPayload;
  /** Delete many TeamStanding documents, return deleted documents */
  deleteManyTeamStandingsConnection: TeamStandingConnection;
  /**
   * Delete many Team documents
   * @deprecated Please use the new paginated many mutation (deleteManyTeamsConnection)
   */
  deleteManyTeams: BatchPayload;
  /** Delete many Team documents, return deleted documents */
  deleteManyTeamsConnection: TeamConnection;
  /** Delete and return scheduled operation */
  deleteScheduledOperation?: Maybe<ScheduledOperation>;
  /** Delete one scheduledRelease from _all_ existing stages. Returns deleted document. */
  deleteScheduledRelease?: Maybe<ScheduledRelease>;
  /** Delete one teacher from _all_ existing stages. Returns deleted document. */
  deleteTeacher?: Maybe<Teacher>;
  /** Delete one team from _all_ existing stages. Returns deleted document. */
  deleteTeam?: Maybe<Team>;
  /** Delete one teamStanding from _all_ existing stages. Returns deleted document. */
  deleteTeamStanding?: Maybe<TeamStanding>;
  /** Publish one asset */
  publishAsset?: Maybe<Asset>;
  /** Publish one challenge */
  publishChallenge?: Maybe<Challenge>;
  /** Publish one driver */
  publishDriver?: Maybe<Driver>;
  /** Publish one driverStanding */
  publishDriverStanding?: Maybe<DriverStanding>;
  /** Publish one hallOfFame */
  publishHallOfFame?: Maybe<HallOfFame>;
  /** Publish one lesson */
  publishLesson?: Maybe<Lesson>;
  /**
   * Publish many Asset documents
   * @deprecated Please use the new paginated many mutation (publishManyAssetsConnection)
   */
  publishManyAssets: BatchPayload;
  /** Publish many Asset documents */
  publishManyAssetsConnection: AssetConnection;
  /**
   * Publish many Challenge documents
   * @deprecated Please use the new paginated many mutation (publishManyChallengesConnection)
   */
  publishManyChallenges: BatchPayload;
  /** Publish many Challenge documents */
  publishManyChallengesConnection: ChallengeConnection;
  /**
   * Publish many DriverStanding documents
   * @deprecated Please use the new paginated many mutation (publishManyDriverStandingsConnection)
   */
  publishManyDriverStandings: BatchPayload;
  /** Publish many DriverStanding documents */
  publishManyDriverStandingsConnection: DriverStandingConnection;
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
   * Publish many Lesson documents
   * @deprecated Please use the new paginated many mutation (publishManyLessonsConnection)
   */
  publishManyLessons: BatchPayload;
  /** Publish many Lesson documents */
  publishManyLessonsConnection: LessonConnection;
  /**
   * Publish many Teacher documents
   * @deprecated Please use the new paginated many mutation (publishManyTeachersConnection)
   */
  publishManyTeachers: BatchPayload;
  /** Publish many Teacher documents */
  publishManyTeachersConnection: TeacherConnection;
  /**
   * Publish many TeamStanding documents
   * @deprecated Please use the new paginated many mutation (publishManyTeamStandingsConnection)
   */
  publishManyTeamStandings: BatchPayload;
  /** Publish many TeamStanding documents */
  publishManyTeamStandingsConnection: TeamStandingConnection;
  /**
   * Publish many Team documents
   * @deprecated Please use the new paginated many mutation (publishManyTeamsConnection)
   */
  publishManyTeams: BatchPayload;
  /** Publish many Team documents */
  publishManyTeamsConnection: TeamConnection;
  /** Publish one teacher */
  publishTeacher?: Maybe<Teacher>;
  /** Publish one team */
  publishTeam?: Maybe<Team>;
  /** Publish one teamStanding */
  publishTeamStanding?: Maybe<TeamStanding>;
  /** Schedule to publish one asset */
  schedulePublishAsset?: Maybe<Asset>;
  /** Schedule to publish one challenge */
  schedulePublishChallenge?: Maybe<Challenge>;
  /** Schedule to publish one driver */
  schedulePublishDriver?: Maybe<Driver>;
  /** Schedule to publish one driverStanding */
  schedulePublishDriverStanding?: Maybe<DriverStanding>;
  /** Schedule to publish one hallOfFame */
  schedulePublishHallOfFame?: Maybe<HallOfFame>;
  /** Schedule to publish one lesson */
  schedulePublishLesson?: Maybe<Lesson>;
  /** Schedule to publish one teacher */
  schedulePublishTeacher?: Maybe<Teacher>;
  /** Schedule to publish one team */
  schedulePublishTeam?: Maybe<Team>;
  /** Schedule to publish one teamStanding */
  schedulePublishTeamStanding?: Maybe<TeamStanding>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishAsset?: Maybe<Asset>;
  /** Unpublish one challenge from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishChallenge?: Maybe<Challenge>;
  /** Unpublish one driver from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishDriver?: Maybe<Driver>;
  /** Unpublish one driverStanding from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishDriverStanding?: Maybe<DriverStanding>;
  /** Unpublish one hallOfFame from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishHallOfFame?: Maybe<HallOfFame>;
  /** Unpublish one lesson from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishLesson?: Maybe<Lesson>;
  /** Unpublish one teacher from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTeacher?: Maybe<Teacher>;
  /** Unpublish one team from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTeam?: Maybe<Team>;
  /** Unpublish one teamStanding from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  scheduleUnpublishTeamStanding?: Maybe<TeamStanding>;
  /** Unpublish one asset from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishAsset?: Maybe<Asset>;
  /** Unpublish one challenge from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishChallenge?: Maybe<Challenge>;
  /** Unpublish one driver from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishDriver?: Maybe<Driver>;
  /** Unpublish one driverStanding from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishDriverStanding?: Maybe<DriverStanding>;
  /** Unpublish one hallOfFame from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishHallOfFame?: Maybe<HallOfFame>;
  /** Unpublish one lesson from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishLesson?: Maybe<Lesson>;
  /**
   * Unpublish many Asset documents
   * @deprecated Please use the new paginated many mutation (unpublishManyAssetsConnection)
   */
  unpublishManyAssets: BatchPayload;
  /** Find many Asset documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyAssetsConnection: AssetConnection;
  /**
   * Unpublish many Challenge documents
   * @deprecated Please use the new paginated many mutation (unpublishManyChallengesConnection)
   */
  unpublishManyChallenges: BatchPayload;
  /** Find many Challenge documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyChallengesConnection: ChallengeConnection;
  /**
   * Unpublish many DriverStanding documents
   * @deprecated Please use the new paginated many mutation (unpublishManyDriverStandingsConnection)
   */
  unpublishManyDriverStandings: BatchPayload;
  /** Find many DriverStanding documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyDriverStandingsConnection: DriverStandingConnection;
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
   * Unpublish many Lesson documents
   * @deprecated Please use the new paginated many mutation (unpublishManyLessonsConnection)
   */
  unpublishManyLessons: BatchPayload;
  /** Find many Lesson documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyLessonsConnection: LessonConnection;
  /**
   * Unpublish many Teacher documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTeachersConnection)
   */
  unpublishManyTeachers: BatchPayload;
  /** Find many Teacher documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTeachersConnection: TeacherConnection;
  /**
   * Unpublish many TeamStanding documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTeamStandingsConnection)
   */
  unpublishManyTeamStandings: BatchPayload;
  /** Find many TeamStanding documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTeamStandingsConnection: TeamStandingConnection;
  /**
   * Unpublish many Team documents
   * @deprecated Please use the new paginated many mutation (unpublishManyTeamsConnection)
   */
  unpublishManyTeams: BatchPayload;
  /** Find many Team documents that match criteria in specified stage and unpublish from target stages */
  unpublishManyTeamsConnection: TeamConnection;
  /** Unpublish one teacher from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTeacher?: Maybe<Teacher>;
  /** Unpublish one team from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTeam?: Maybe<Team>;
  /** Unpublish one teamStanding from selected stages. Unpublish either the complete document with its relations, localizations and base data or specific localizations only. */
  unpublishTeamStanding?: Maybe<TeamStanding>;
  /** Update one asset */
  updateAsset?: Maybe<Asset>;
  /** Update one challenge */
  updateChallenge?: Maybe<Challenge>;
  /** Update one driver */
  updateDriver?: Maybe<Driver>;
  /** Update one driverStanding */
  updateDriverStanding?: Maybe<DriverStanding>;
  /** Update one hallOfFame */
  updateHallOfFame?: Maybe<HallOfFame>;
  /** Update one lesson */
  updateLesson?: Maybe<Lesson>;
  /**
   * Update many assets
   * @deprecated Please use the new paginated many mutation (updateManyAssetsConnection)
   */
  updateManyAssets: BatchPayload;
  /** Update many Asset documents */
  updateManyAssetsConnection: AssetConnection;
  /**
   * Update many challenges
   * @deprecated Please use the new paginated many mutation (updateManyChallengesConnection)
   */
  updateManyChallenges: BatchPayload;
  /** Update many Challenge documents */
  updateManyChallengesConnection: ChallengeConnection;
  /**
   * Update many driverStandings
   * @deprecated Please use the new paginated many mutation (updateManyDriverStandingsConnection)
   */
  updateManyDriverStandings: BatchPayload;
  /** Update many DriverStanding documents */
  updateManyDriverStandingsConnection: DriverStandingConnection;
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
   * Update many lessons
   * @deprecated Please use the new paginated many mutation (updateManyLessonsConnection)
   */
  updateManyLessons: BatchPayload;
  /** Update many Lesson documents */
  updateManyLessonsConnection: LessonConnection;
  /**
   * Update many teachers
   * @deprecated Please use the new paginated many mutation (updateManyTeachersConnection)
   */
  updateManyTeachers: BatchPayload;
  /** Update many Teacher documents */
  updateManyTeachersConnection: TeacherConnection;
  /**
   * Update many teamStandings
   * @deprecated Please use the new paginated many mutation (updateManyTeamStandingsConnection)
   */
  updateManyTeamStandings: BatchPayload;
  /** Update many TeamStanding documents */
  updateManyTeamStandingsConnection: TeamStandingConnection;
  /**
   * Update many teams
   * @deprecated Please use the new paginated many mutation (updateManyTeamsConnection)
   */
  updateManyTeams: BatchPayload;
  /** Update many Team documents */
  updateManyTeamsConnection: TeamConnection;
  /** Update one scheduledRelease */
  updateScheduledRelease?: Maybe<ScheduledRelease>;
  /** Update one teacher */
  updateTeacher?: Maybe<Teacher>;
  /** Update one team */
  updateTeam?: Maybe<Team>;
  /** Update one teamStanding */
  updateTeamStanding?: Maybe<TeamStanding>;
  /** Upsert one asset */
  upsertAsset?: Maybe<Asset>;
  /** Upsert one challenge */
  upsertChallenge?: Maybe<Challenge>;
  /** Upsert one driver */
  upsertDriver?: Maybe<Driver>;
  /** Upsert one driverStanding */
  upsertDriverStanding?: Maybe<DriverStanding>;
  /** Upsert one hallOfFame */
  upsertHallOfFame?: Maybe<HallOfFame>;
  /** Upsert one lesson */
  upsertLesson?: Maybe<Lesson>;
  /** Upsert one teacher */
  upsertTeacher?: Maybe<Teacher>;
  /** Upsert one team */
  upsertTeam?: Maybe<Team>;
  /** Upsert one teamStanding */
  upsertTeamStanding?: Maybe<TeamStanding>;
};


export type MutationCreateAssetArgs = {
  data: AssetCreateInput;
};


export type MutationCreateChallengeArgs = {
  data: ChallengeCreateInput;
};


export type MutationCreateDriverArgs = {
  data: DriverCreateInput;
};


export type MutationCreateDriverStandingArgs = {
  data: DriverStandingCreateInput;
};


export type MutationCreateHallOfFameArgs = {
  data: HallOfFameCreateInput;
};


export type MutationCreateLessonArgs = {
  data: LessonCreateInput;
};


export type MutationCreateScheduledReleaseArgs = {
  data: ScheduledReleaseCreateInput;
};


export type MutationCreateTeacherArgs = {
  data: TeacherCreateInput;
};


export type MutationCreateTeamArgs = {
  data: TeamCreateInput;
};


export type MutationCreateTeamStandingArgs = {
  data: TeamStandingCreateInput;
};


export type MutationDeleteAssetArgs = {
  where: AssetWhereUniqueInput;
};


export type MutationDeleteChallengeArgs = {
  where: ChallengeWhereUniqueInput;
};


export type MutationDeleteDriverArgs = {
  where: DriverWhereUniqueInput;
};


export type MutationDeleteDriverStandingArgs = {
  where: DriverStandingWhereUniqueInput;
};


export type MutationDeleteHallOfFameArgs = {
  where: HallOfFameWhereUniqueInput;
};


export type MutationDeleteLessonArgs = {
  where: LessonWhereUniqueInput;
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


export type MutationDeleteManyChallengesArgs = {
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationDeleteManyChallengesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationDeleteManyDriverStandingsArgs = {
  where?: InputMaybe<DriverStandingManyWhereInput>;
};


export type MutationDeleteManyDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverStandingManyWhereInput>;
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


export type MutationDeleteManyLessonsArgs = {
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationDeleteManyLessonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationDeleteManyTeachersArgs = {
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationDeleteManyTeachersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationDeleteManyTeamStandingsArgs = {
  where?: InputMaybe<TeamStandingManyWhereInput>;
};


export type MutationDeleteManyTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamStandingManyWhereInput>;
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


export type MutationDeleteScheduledOperationArgs = {
  where: ScheduledOperationWhereUniqueInput;
};


export type MutationDeleteScheduledReleaseArgs = {
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationDeleteTeacherArgs = {
  where: TeacherWhereUniqueInput;
};


export type MutationDeleteTeamArgs = {
  where: TeamWhereUniqueInput;
};


export type MutationDeleteTeamStandingArgs = {
  where: TeamStandingWhereUniqueInput;
};


export type MutationPublishAssetArgs = {
  locales?: InputMaybe<Array<Locale>>;
  publishBase?: InputMaybe<Scalars['Boolean']>;
  to?: Array<Stage>;
  where: AssetWhereUniqueInput;
  withDefaultLocale?: InputMaybe<Scalars['Boolean']>;
};


export type MutationPublishChallengeArgs = {
  to?: Array<Stage>;
  where: ChallengeWhereUniqueInput;
};


export type MutationPublishDriverArgs = {
  to?: Array<Stage>;
  where: DriverWhereUniqueInput;
};


export type MutationPublishDriverStandingArgs = {
  to?: Array<Stage>;
  where: DriverStandingWhereUniqueInput;
};


export type MutationPublishHallOfFameArgs = {
  to?: Array<Stage>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationPublishLessonArgs = {
  to?: Array<Stage>;
  where: LessonWhereUniqueInput;
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


export type MutationPublishManyChallengesArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationPublishManyChallengesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationPublishManyDriverStandingsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<DriverStandingManyWhereInput>;
};


export type MutationPublishManyDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<DriverStandingManyWhereInput>;
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


export type MutationPublishManyLessonsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationPublishManyLessonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationPublishManyTeachersArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationPublishManyTeachersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationPublishManyTeamStandingsArgs = {
  to?: Array<Stage>;
  where?: InputMaybe<TeamStandingManyWhereInput>;
};


export type MutationPublishManyTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: InputMaybe<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  to?: Array<Stage>;
  where?: InputMaybe<TeamStandingManyWhereInput>;
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


export type MutationPublishTeacherArgs = {
  to?: Array<Stage>;
  where: TeacherWhereUniqueInput;
};


export type MutationPublishTeamArgs = {
  to?: Array<Stage>;
  where: TeamWhereUniqueInput;
};


export type MutationPublishTeamStandingArgs = {
  to?: Array<Stage>;
  where: TeamStandingWhereUniqueInput;
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


export type MutationSchedulePublishChallengeArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: ChallengeWhereUniqueInput;
};


export type MutationSchedulePublishDriverArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: DriverWhereUniqueInput;
};


export type MutationSchedulePublishDriverStandingArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: DriverStandingWhereUniqueInput;
};


export type MutationSchedulePublishHallOfFameArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationSchedulePublishLessonArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: LessonWhereUniqueInput;
};


export type MutationSchedulePublishTeacherArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TeacherWhereUniqueInput;
};


export type MutationSchedulePublishTeamArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TeamWhereUniqueInput;
};


export type MutationSchedulePublishTeamStandingArgs = {
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  to?: Array<Stage>;
  where: TeamStandingWhereUniqueInput;
};


export type MutationScheduleUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationScheduleUnpublishChallengeArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: ChallengeWhereUniqueInput;
};


export type MutationScheduleUnpublishDriverArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: DriverWhereUniqueInput;
};


export type MutationScheduleUnpublishDriverStandingArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: DriverStandingWhereUniqueInput;
};


export type MutationScheduleUnpublishHallOfFameArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationScheduleUnpublishLessonArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: LessonWhereUniqueInput;
};


export type MutationScheduleUnpublishTeacherArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TeacherWhereUniqueInput;
};


export type MutationScheduleUnpublishTeamArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TeamWhereUniqueInput;
};


export type MutationScheduleUnpublishTeamStandingArgs = {
  from?: Array<Stage>;
  releaseAt?: InputMaybe<Scalars['DateTime']>;
  releaseId?: InputMaybe<Scalars['String']>;
  where: TeamStandingWhereUniqueInput;
};


export type MutationUnpublishAssetArgs = {
  from?: Array<Stage>;
  locales?: InputMaybe<Array<Locale>>;
  unpublishBase?: InputMaybe<Scalars['Boolean']>;
  where: AssetWhereUniqueInput;
};


export type MutationUnpublishChallengeArgs = {
  from?: Array<Stage>;
  where: ChallengeWhereUniqueInput;
};


export type MutationUnpublishDriverArgs = {
  from?: Array<Stage>;
  where: DriverWhereUniqueInput;
};


export type MutationUnpublishDriverStandingArgs = {
  from?: Array<Stage>;
  where: DriverStandingWhereUniqueInput;
};


export type MutationUnpublishHallOfFameArgs = {
  from?: Array<Stage>;
  where: HallOfFameWhereUniqueInput;
};


export type MutationUnpublishLessonArgs = {
  from?: Array<Stage>;
  where: LessonWhereUniqueInput;
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


export type MutationUnpublishManyChallengesArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationUnpublishManyChallengesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationUnpublishManyDriverStandingsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<DriverStandingManyWhereInput>;
};


export type MutationUnpublishManyDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<DriverStandingManyWhereInput>;
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


export type MutationUnpublishManyLessonsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationUnpublishManyLessonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationUnpublishManyTeachersArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationUnpublishManyTeachersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationUnpublishManyTeamStandingsArgs = {
  from?: Array<Stage>;
  where?: InputMaybe<TeamStandingManyWhereInput>;
};


export type MutationUnpublishManyTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  from?: Array<Stage>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: InputMaybe<Stage>;
  where?: InputMaybe<TeamStandingManyWhereInput>;
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


export type MutationUnpublishTeacherArgs = {
  from?: Array<Stage>;
  where: TeacherWhereUniqueInput;
};


export type MutationUnpublishTeamArgs = {
  from?: Array<Stage>;
  where: TeamWhereUniqueInput;
};


export type MutationUnpublishTeamStandingArgs = {
  from?: Array<Stage>;
  where: TeamStandingWhereUniqueInput;
};


export type MutationUpdateAssetArgs = {
  data: AssetUpdateInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpdateChallengeArgs = {
  data: ChallengeUpdateInput;
  where: ChallengeWhereUniqueInput;
};


export type MutationUpdateDriverArgs = {
  data: DriverUpdateInput;
  where: DriverWhereUniqueInput;
};


export type MutationUpdateDriverStandingArgs = {
  data: DriverStandingUpdateInput;
  where: DriverStandingWhereUniqueInput;
};


export type MutationUpdateHallOfFameArgs = {
  data: HallOfFameUpdateInput;
  where: HallOfFameWhereUniqueInput;
};


export type MutationUpdateLessonArgs = {
  data: LessonUpdateInput;
  where: LessonWhereUniqueInput;
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


export type MutationUpdateManyChallengesArgs = {
  data: ChallengeUpdateManyInput;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationUpdateManyChallengesConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: ChallengeUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ChallengeManyWhereInput>;
};


export type MutationUpdateManyDriverStandingsArgs = {
  data: DriverStandingUpdateManyInput;
  where?: InputMaybe<DriverStandingManyWhereInput>;
};


export type MutationUpdateManyDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: DriverStandingUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<DriverStandingManyWhereInput>;
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


export type MutationUpdateManyLessonsArgs = {
  data: LessonUpdateManyInput;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationUpdateManyLessonsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: LessonUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LessonManyWhereInput>;
};


export type MutationUpdateManyTeachersArgs = {
  data: TeacherUpdateManyInput;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationUpdateManyTeachersConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: TeacherUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeacherManyWhereInput>;
};


export type MutationUpdateManyTeamStandingsArgs = {
  data: TeamStandingUpdateManyInput;
  where?: InputMaybe<TeamStandingManyWhereInput>;
};


export type MutationUpdateManyTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['ID']>;
  before?: InputMaybe<Scalars['ID']>;
  data: TeamStandingUpdateManyInput;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<TeamStandingManyWhereInput>;
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


export type MutationUpdateScheduledReleaseArgs = {
  data: ScheduledReleaseUpdateInput;
  where: ScheduledReleaseWhereUniqueInput;
};


export type MutationUpdateTeacherArgs = {
  data: TeacherUpdateInput;
  where: TeacherWhereUniqueInput;
};


export type MutationUpdateTeamArgs = {
  data: TeamUpdateInput;
  where: TeamWhereUniqueInput;
};


export type MutationUpdateTeamStandingArgs = {
  data: TeamStandingUpdateInput;
  where: TeamStandingWhereUniqueInput;
};


export type MutationUpsertAssetArgs = {
  upsert: AssetUpsertInput;
  where: AssetWhereUniqueInput;
};


export type MutationUpsertChallengeArgs = {
  upsert: ChallengeUpsertInput;
  where: ChallengeWhereUniqueInput;
};


export type MutationUpsertDriverArgs = {
  upsert: DriverUpsertInput;
  where: DriverWhereUniqueInput;
};


export type MutationUpsertDriverStandingArgs = {
  upsert: DriverStandingUpsertInput;
  where: DriverStandingWhereUniqueInput;
};


export type MutationUpsertHallOfFameArgs = {
  upsert: HallOfFameUpsertInput;
  where: HallOfFameWhereUniqueInput;
};


export type MutationUpsertLessonArgs = {
  upsert: LessonUpsertInput;
  where: LessonWhereUniqueInput;
};


export type MutationUpsertTeacherArgs = {
  upsert: TeacherUpsertInput;
  where: TeacherWhereUniqueInput;
};


export type MutationUpsertTeamArgs = {
  upsert: TeamUpsertInput;
  where: TeamWhereUniqueInput;
};


export type MutationUpsertTeamStandingArgs = {
  upsert: TeamStandingUpsertInput;
  where: TeamStandingWhereUniqueInput;
};

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
  /** Retrieve a single challenge */
  challenge?: Maybe<Challenge>;
  /** Retrieve document version */
  challengeVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple challenges */
  challenges: Array<Challenge>;
  /** Retrieve multiple challenges using the Relay connection interface */
  challengesConnection: ChallengeConnection;
  /** Retrieve a single driver */
  driver?: Maybe<Driver>;
  /** Retrieve a single driverStanding */
  driverStanding?: Maybe<DriverStanding>;
  /** Retrieve document version */
  driverStandingVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple driverStandings */
  driverStandings: Array<DriverStanding>;
  /** Retrieve multiple driverStandings using the Relay connection interface */
  driverStandingsConnection: DriverStandingConnection;
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
  /** Retrieve a single lesson */
  lesson?: Maybe<Lesson>;
  /** Retrieve document version */
  lessonVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple lessons */
  lessons: Array<Lesson>;
  /** Retrieve multiple lessons using the Relay connection interface */
  lessonsConnection: LessonConnection;
  /** Fetches an object given its ID */
  node?: Maybe<Node>;
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
  /** Retrieve a single teacher */
  teacher?: Maybe<Teacher>;
  /** Retrieve document version */
  teacherVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple teachers */
  teachers: Array<Teacher>;
  /** Retrieve multiple teachers using the Relay connection interface */
  teachersConnection: TeacherConnection;
  /** Retrieve a single team */
  team?: Maybe<Team>;
  /** Retrieve a single teamStanding */
  teamStanding?: Maybe<TeamStanding>;
  /** Retrieve document version */
  teamStandingVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple teamStandings */
  teamStandings: Array<TeamStanding>;
  /** Retrieve multiple teamStandings using the Relay connection interface */
  teamStandingsConnection: TeamStandingConnection;
  /** Retrieve document version */
  teamVersion?: Maybe<DocumentVersion>;
  /** Retrieve multiple teams */
  teams: Array<Team>;
  /** Retrieve multiple teams using the Relay connection interface */
  teamsConnection: TeamConnection;
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


export type QueryChallengeArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: ChallengeWhereUniqueInput;
};


export type QueryChallengeVersionArgs = {
  where: VersionWhereInput;
};


export type QueryChallengesArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ChallengeOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ChallengeWhereInput>;
};


export type QueryChallengesConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<ChallengeOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<ChallengeWhereInput>;
};


export type QueryDriverArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: DriverWhereUniqueInput;
};


export type QueryDriverStandingArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: DriverStandingWhereUniqueInput;
};


export type QueryDriverStandingVersionArgs = {
  where: VersionWhereInput;
};


export type QueryDriverStandingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<DriverStandingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<DriverStandingWhereInput>;
};


export type QueryDriverStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<DriverStandingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<DriverStandingWhereInput>;
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


export type QueryLessonArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: LessonWhereUniqueInput;
};


export type QueryLessonVersionArgs = {
  where: VersionWhereInput;
};


export type QueryLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LessonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<LessonWhereInput>;
};


export type QueryLessonsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<LessonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<LessonWhereInput>;
};


export type QueryNodeArgs = {
  id: Scalars['ID'];
  locales?: Array<Locale>;
  stage?: Stage;
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


export type QueryTeacherArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TeacherWhereUniqueInput;
};


export type QueryTeacherVersionArgs = {
  where: VersionWhereInput;
};


export type QueryTeachersArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TeacherOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TeacherWhereInput>;
};


export type QueryTeachersConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TeacherOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TeacherWhereInput>;
};


export type QueryTeamArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TeamWhereUniqueInput;
};


export type QueryTeamStandingArgs = {
  locales?: Array<Locale>;
  stage?: Stage;
  where: TeamStandingWhereUniqueInput;
};


export type QueryTeamStandingVersionArgs = {
  where: VersionWhereInput;
};


export type QueryTeamStandingsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TeamStandingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TeamStandingWhereInput>;
};


export type QueryTeamStandingsConnectionArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: Array<Locale>;
  orderBy?: InputMaybe<TeamStandingOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  stage?: Stage;
  where?: InputMaybe<TeamStandingWhereInput>;
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

export type ScheduledOperationAffectedDocument = Asset | Challenge | Driver | DriverStanding | HallOfFame | Lesson | Teacher | Team | TeamStanding;

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

export type Teacher = Entity & Node & {
  __typename?: 'Teacher';
  avatarURL: Scalars['String'];
  bio: Scalars['String'];
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Teacher>;
  /** List of Teacher versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  lessons: Array<Lesson>;
  name: Scalars['String'];
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


export type TeacherCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeacherDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type TeacherHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type TeacherLessonsArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  orderBy?: InputMaybe<LessonOrderByInput>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<LessonWhereInput>;
};


export type TeacherPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeacherScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type TeacherUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TeacherConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: TeacherWhereUniqueInput;
};

/** A connection to a list of items. */
export type TeacherConnection = {
  __typename?: 'TeacherConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<TeacherEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type TeacherCreateInput = {
  avatarURL: Scalars['String'];
  bio: Scalars['String'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  lessons?: InputMaybe<LessonCreateManyInlineInput>;
  name: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TeacherCreateManyInlineInput = {
  /** Connect multiple existing Teacher documents */
  connect?: InputMaybe<Array<TeacherWhereUniqueInput>>;
  /** Create and connect multiple existing Teacher documents */
  create?: InputMaybe<Array<TeacherCreateInput>>;
};

export type TeacherCreateOneInlineInput = {
  /** Connect one existing Teacher document */
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  /** Create and connect one Teacher document */
  create?: InputMaybe<TeacherCreateInput>;
};

/** An edge in a connection. */
export type TeacherEdge = {
  __typename?: 'TeacherEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: Teacher;
};

/** Identifies documents */
export type TeacherManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeacherWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeacherWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeacherWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  avatarURL?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  avatarURL_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  avatarURL_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  avatarURL_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  avatarURL_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  avatarURL_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  avatarURL_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  avatarURL_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  avatarURL_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  avatarURL_starts_with?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  bio_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  bio_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  bio_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  bio_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  bio_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  bio_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  bio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  bio_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  bio_starts_with?: InputMaybe<Scalars['String']>;
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
  documentInStages_every?: InputMaybe<TeacherWhereStageInput>;
  documentInStages_none?: InputMaybe<TeacherWhereStageInput>;
  documentInStages_some?: InputMaybe<TeacherWhereStageInput>;
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
  lessons_every?: InputMaybe<LessonWhereInput>;
  lessons_none?: InputMaybe<LessonWhereInput>;
  lessons_some?: InputMaybe<LessonWhereInput>;
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

export enum TeacherOrderByInput {
  AvatarUrlAsc = 'avatarURL_ASC',
  AvatarUrlDesc = 'avatarURL_DESC',
  BioAsc = 'bio_ASC',
  BioDesc = 'bio_DESC',
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TeacherUpdateInput = {
  avatarURL?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  lessons?: InputMaybe<LessonUpdateManyInlineInput>;
  name?: InputMaybe<Scalars['String']>;
};

export type TeacherUpdateManyInlineInput = {
  /** Connect multiple existing Teacher documents */
  connect?: InputMaybe<Array<TeacherConnectInput>>;
  /** Create and connect multiple Teacher documents */
  create?: InputMaybe<Array<TeacherCreateInput>>;
  /** Delete multiple Teacher documents */
  delete?: InputMaybe<Array<TeacherWhereUniqueInput>>;
  /** Disconnect multiple Teacher documents */
  disconnect?: InputMaybe<Array<TeacherWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing Teacher documents */
  set?: InputMaybe<Array<TeacherWhereUniqueInput>>;
  /** Update multiple Teacher documents */
  update?: InputMaybe<Array<TeacherUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple Teacher documents */
  upsert?: InputMaybe<Array<TeacherUpsertWithNestedWhereUniqueInput>>;
};

export type TeacherUpdateManyInput = {
  avatarURL?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type TeacherUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: TeacherUpdateManyInput;
  /** Document search */
  where: TeacherWhereInput;
};

export type TeacherUpdateOneInlineInput = {
  /** Connect existing Teacher document */
  connect?: InputMaybe<TeacherWhereUniqueInput>;
  /** Create and connect one Teacher document */
  create?: InputMaybe<TeacherCreateInput>;
  /** Delete currently connected Teacher document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected Teacher document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single Teacher document */
  update?: InputMaybe<TeacherUpdateWithNestedWhereUniqueInput>;
  /** Upsert single Teacher document */
  upsert?: InputMaybe<TeacherUpsertWithNestedWhereUniqueInput>;
};

export type TeacherUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: TeacherUpdateInput;
  /** Unique document search */
  where: TeacherWhereUniqueInput;
};

export type TeacherUpsertInput = {
  /** Create document if it didn't exist */
  create: TeacherCreateInput;
  /** Update document if it exists */
  update: TeacherUpdateInput;
};

export type TeacherUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: TeacherUpsertInput;
  /** Unique document search */
  where: TeacherWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type TeacherWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type TeacherWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeacherWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeacherWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeacherWhereInput>>;
  /** Contains search across all appropriate fields. */
  _search?: InputMaybe<Scalars['String']>;
  avatarURL?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  avatarURL_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  avatarURL_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  avatarURL_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  avatarURL_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  avatarURL_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  avatarURL_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  avatarURL_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  avatarURL_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  avatarURL_starts_with?: InputMaybe<Scalars['String']>;
  bio?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  bio_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  bio_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  bio_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  bio_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  bio_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  bio_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  bio_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  bio_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  bio_starts_with?: InputMaybe<Scalars['String']>;
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
  documentInStages_every?: InputMaybe<TeacherWhereStageInput>;
  documentInStages_none?: InputMaybe<TeacherWhereStageInput>;
  documentInStages_some?: InputMaybe<TeacherWhereStageInput>;
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
  lessons_every?: InputMaybe<LessonWhereInput>;
  lessons_none?: InputMaybe<LessonWhereInput>;
  lessons_some?: InputMaybe<LessonWhereInput>;
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
export type TeacherWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeacherWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeacherWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeacherWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<TeacherWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References Teacher record uniquely */
export type TeacherWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type Team = Entity & Node & {
  __typename?: 'Team';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<Team>;
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
  team?: Maybe<Scalars['String']>;
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


export type TeamHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type TeamPhotoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
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
  createdAt?: InputMaybe<Scalars['DateTime']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  team?: InputMaybe<Scalars['String']>;
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
  documentInStages_every?: InputMaybe<TeamWhereStageInput>;
  documentInStages_none?: InputMaybe<TeamWhereStageInput>;
  documentInStages_some?: InputMaybe<TeamWhereStageInput>;
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
  team?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  team_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  team_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  team_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  team_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  team_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  team_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  team_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  team_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  team_starts_with?: InputMaybe<Scalars['String']>;
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
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  NameAsc = 'name_ASC',
  NameDesc = 'name_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  TeamAsc = 'team_ASC',
  TeamDesc = 'team_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TeamStanding = Entity & Node & {
  __typename?: 'TeamStanding';
  /** The time the document was created */
  createdAt: Scalars['DateTime'];
  /** User that created this document */
  createdBy?: Maybe<User>;
  /** Get the document in other stages */
  documentInStages: Array<TeamStanding>;
  /** List of TeamStanding versions */
  history: Array<Version>;
  /** The unique identifier */
  id: Scalars['ID'];
  photo?: Maybe<Asset>;
  /** The time the document was published. Null on documents in draft stage. */
  publishedAt?: Maybe<Scalars['DateTime']>;
  /** User that last published this document */
  publishedBy?: Maybe<User>;
  round: Scalars['String'];
  scheduledIn: Array<ScheduledOperation>;
  season: Scalars['String'];
  /** System stage field */
  stage: Stage;
  /** The time the document was updated */
  updatedAt: Scalars['DateTime'];
  /** User that last updated this document */
  updatedBy?: Maybe<User>;
};


export type TeamStandingCreatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeamStandingDocumentInStagesArgs = {
  includeCurrent?: Scalars['Boolean'];
  inheritLocale?: Scalars['Boolean'];
  stages?: Array<Stage>;
};


export type TeamStandingHistoryArgs = {
  limit?: Scalars['Int'];
  skip?: Scalars['Int'];
  stageOverride?: InputMaybe<Stage>;
};


export type TeamStandingPhotoArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeamStandingPublishedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};


export type TeamStandingScheduledInArgs = {
  after?: InputMaybe<Scalars['String']>;
  before?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  last?: InputMaybe<Scalars['Int']>;
  locales?: InputMaybe<Array<Locale>>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<ScheduledOperationWhereInput>;
};


export type TeamStandingUpdatedByArgs = {
  forceParentLocale?: InputMaybe<Scalars['Boolean']>;
  locales?: InputMaybe<Array<Locale>>;
};

export type TeamStandingConnectInput = {
  /** Allow to specify document position in list of connected documents, will default to appending at end of list */
  position?: InputMaybe<ConnectPositionInput>;
  /** Document to connect */
  where: TeamStandingWhereUniqueInput;
};

/** A connection to a list of items. */
export type TeamStandingConnection = {
  __typename?: 'TeamStandingConnection';
  aggregate: Aggregate;
  /** A list of edges. */
  edges: Array<TeamStandingEdge>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

export type TeamStandingCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  photo?: InputMaybe<AssetCreateOneInlineInput>;
  round: Scalars['String'];
  season: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TeamStandingCreateManyInlineInput = {
  /** Connect multiple existing TeamStanding documents */
  connect?: InputMaybe<Array<TeamStandingWhereUniqueInput>>;
  /** Create and connect multiple existing TeamStanding documents */
  create?: InputMaybe<Array<TeamStandingCreateInput>>;
};

export type TeamStandingCreateOneInlineInput = {
  /** Connect one existing TeamStanding document */
  connect?: InputMaybe<TeamStandingWhereUniqueInput>;
  /** Create and connect one TeamStanding document */
  create?: InputMaybe<TeamStandingCreateInput>;
};

/** An edge in a connection. */
export type TeamStandingEdge = {
  __typename?: 'TeamStandingEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String'];
  /** The item at the end of the edge. */
  node: TeamStanding;
};

/** Identifies documents */
export type TeamStandingManyWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeamStandingWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeamStandingWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeamStandingWhereInput>>;
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
  documentInStages_every?: InputMaybe<TeamStandingWhereStageInput>;
  documentInStages_none?: InputMaybe<TeamStandingWhereStageInput>;
  documentInStages_some?: InputMaybe<TeamStandingWhereStageInput>;
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

export enum TeamStandingOrderByInput {
  CreatedAtAsc = 'createdAt_ASC',
  CreatedAtDesc = 'createdAt_DESC',
  IdAsc = 'id_ASC',
  IdDesc = 'id_DESC',
  PublishedAtAsc = 'publishedAt_ASC',
  PublishedAtDesc = 'publishedAt_DESC',
  RoundAsc = 'round_ASC',
  RoundDesc = 'round_DESC',
  SeasonAsc = 'season_ASC',
  SeasonDesc = 'season_DESC',
  UpdatedAtAsc = 'updatedAt_ASC',
  UpdatedAtDesc = 'updatedAt_DESC'
}

export type TeamStandingUpdateInput = {
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
  round?: InputMaybe<Scalars['String']>;
  season?: InputMaybe<Scalars['String']>;
};

export type TeamStandingUpdateManyInlineInput = {
  /** Connect multiple existing TeamStanding documents */
  connect?: InputMaybe<Array<TeamStandingConnectInput>>;
  /** Create and connect multiple TeamStanding documents */
  create?: InputMaybe<Array<TeamStandingCreateInput>>;
  /** Delete multiple TeamStanding documents */
  delete?: InputMaybe<Array<TeamStandingWhereUniqueInput>>;
  /** Disconnect multiple TeamStanding documents */
  disconnect?: InputMaybe<Array<TeamStandingWhereUniqueInput>>;
  /** Override currently-connected documents with multiple existing TeamStanding documents */
  set?: InputMaybe<Array<TeamStandingWhereUniqueInput>>;
  /** Update multiple TeamStanding documents */
  update?: InputMaybe<Array<TeamStandingUpdateWithNestedWhereUniqueInput>>;
  /** Upsert multiple TeamStanding documents */
  upsert?: InputMaybe<Array<TeamStandingUpsertWithNestedWhereUniqueInput>>;
};

export type TeamStandingUpdateManyInput = {
  round?: InputMaybe<Scalars['String']>;
  season?: InputMaybe<Scalars['String']>;
};

export type TeamStandingUpdateManyWithNestedWhereInput = {
  /** Update many input */
  data: TeamStandingUpdateManyInput;
  /** Document search */
  where: TeamStandingWhereInput;
};

export type TeamStandingUpdateOneInlineInput = {
  /** Connect existing TeamStanding document */
  connect?: InputMaybe<TeamStandingWhereUniqueInput>;
  /** Create and connect one TeamStanding document */
  create?: InputMaybe<TeamStandingCreateInput>;
  /** Delete currently connected TeamStanding document */
  delete?: InputMaybe<Scalars['Boolean']>;
  /** Disconnect currently connected TeamStanding document */
  disconnect?: InputMaybe<Scalars['Boolean']>;
  /** Update single TeamStanding document */
  update?: InputMaybe<TeamStandingUpdateWithNestedWhereUniqueInput>;
  /** Upsert single TeamStanding document */
  upsert?: InputMaybe<TeamStandingUpsertWithNestedWhereUniqueInput>;
};

export type TeamStandingUpdateWithNestedWhereUniqueInput = {
  /** Document to update */
  data: TeamStandingUpdateInput;
  /** Unique document search */
  where: TeamStandingWhereUniqueInput;
};

export type TeamStandingUpsertInput = {
  /** Create document if it didn't exist */
  create: TeamStandingCreateInput;
  /** Update document if it exists */
  update: TeamStandingUpdateInput;
};

export type TeamStandingUpsertWithNestedWhereUniqueInput = {
  /** Upsert data */
  data: TeamStandingUpsertInput;
  /** Unique document search */
  where: TeamStandingWhereUniqueInput;
};

/** This contains a set of filters that can be used to compare values internally */
export type TeamStandingWhereComparatorInput = {
  /** This field can be used to request to check if the entry is outdated by internal comparison */
  outdated_to?: InputMaybe<Scalars['Boolean']>;
};

/** Identifies documents */
export type TeamStandingWhereInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeamStandingWhereInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeamStandingWhereInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeamStandingWhereInput>>;
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
  documentInStages_every?: InputMaybe<TeamStandingWhereStageInput>;
  documentInStages_none?: InputMaybe<TeamStandingWhereStageInput>;
  documentInStages_some?: InputMaybe<TeamStandingWhereStageInput>;
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
export type TeamStandingWhereStageInput = {
  /** Logical AND on all given filters. */
  AND?: InputMaybe<Array<TeamStandingWhereStageInput>>;
  /** Logical NOT on all given filters combined by AND. */
  NOT?: InputMaybe<Array<TeamStandingWhereStageInput>>;
  /** Logical OR on all given filters. */
  OR?: InputMaybe<Array<TeamStandingWhereStageInput>>;
  /** This field contains fields which can be set as true or false to specify an internal comparison */
  compareWithParent?: InputMaybe<TeamStandingWhereComparatorInput>;
  /** Specify the stage to compare with */
  stage?: InputMaybe<Stage>;
};

/** References TeamStanding record uniquely */
export type TeamStandingWhereUniqueInput = {
  id?: InputMaybe<Scalars['ID']>;
};

export type TeamUpdateInput = {
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<AssetUpdateOneInlineInput>;
  team?: InputMaybe<Scalars['String']>;
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
  name?: InputMaybe<Scalars['String']>;
  team?: InputMaybe<Scalars['String']>;
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
  documentInStages_every?: InputMaybe<TeamWhereStageInput>;
  documentInStages_none?: InputMaybe<TeamWhereStageInput>;
  documentInStages_some?: InputMaybe<TeamWhereStageInput>;
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
  team?: InputMaybe<Scalars['String']>;
  /** All values containing the given string. */
  team_contains?: InputMaybe<Scalars['String']>;
  /** All values ending with the given string. */
  team_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are contained in given list. */
  team_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** Any other value that exists and is not equal to the given value. */
  team_not?: InputMaybe<Scalars['String']>;
  /** All values not containing the given string. */
  team_not_contains?: InputMaybe<Scalars['String']>;
  /** All values not ending with the given string */
  team_not_ends_with?: InputMaybe<Scalars['String']>;
  /** All values that are not contained in given list. */
  team_not_in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  /** All values not starting with the given string. */
  team_not_starts_with?: InputMaybe<Scalars['String']>;
  /** All values starting with the given string. */
  team_starts_with?: InputMaybe<Scalars['String']>;
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

export type CreateDriverMutationVariables = Exact<{
  name: Scalars['String'];
  team: Scalars['String'];
  driverNumber: Scalars['String'];
  photo: AssetCreateOneInlineInput;
}>;


export type CreateDriverMutation = { __typename?: 'Mutation', createDriver?: { __typename?: 'Driver', id: string } | null };

export type CreateDriverStandingMutationVariables = Exact<{
  season: Scalars['String'];
  round: Scalars['String'];
  photo: AssetCreateOneInlineInput;
}>;


export type CreateDriverStandingMutation = { __typename?: 'Mutation', createDriverStanding?: { __typename?: 'DriverStanding', id: string } | null };

export type CreateHallOfFameMutationVariables = Exact<{
  season: Scalars['String'];
  photo: AssetCreateOneInlineInput;
}>;


export type CreateHallOfFameMutation = { __typename?: 'Mutation', createHallOfFame?: { __typename?: 'HallOfFame', id: string } | null };

export type CreateTeamMutationVariables = Exact<{
  name: Scalars['String'];
  team: Scalars['String'];
  photo: AssetCreateOneInlineInput;
}>;


export type CreateTeamMutation = { __typename?: 'Mutation', createTeam?: { __typename?: 'Team', id: string } | null };

export type CreateTeamStandingMutationVariables = Exact<{
  season: Scalars['String'];
  round: Scalars['String'];
  photo: AssetCreateOneInlineInput;
}>;


export type CreateTeamStandingMutation = { __typename?: 'Mutation', createTeamStanding?: { __typename?: 'TeamStanding', id: string } | null };

export type GetHallsOfFameQueryVariables = Exact<{ [key: string]: never; }>;


export type GetHallsOfFameQuery = { __typename?: 'Query', hallsOfFame: Array<{ __typename?: 'HallOfFame', id: string, season: string, photo?: { __typename?: 'Asset', id: string, url: string, fileName: string } | null }> };

export type GetDriverStandingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDriverStandingsQuery = { __typename?: 'Query', driverStandings: Array<{ __typename?: 'DriverStanding', id: string, season: string, round: string, photo?: { __typename?: 'Asset', id: string, url: string, fileName: string } | null }> };

export type GetDriversQueryVariables = Exact<{ [key: string]: never; }>;


export type GetDriversQuery = { __typename?: 'Query', drivers: Array<{ __typename?: 'Driver', id: string, name?: string | null, driverNumber?: string | null, team?: string | null, photo?: { __typename?: 'Asset', id: string, url: string, fileName: string } | null }> };

export type GetLessonBySlugQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']>;
}>;


export type GetLessonBySlugQuery = { __typename?: 'Query', lesson?: { __typename?: 'Lesson', title: string, description?: string | null, videoId: string, teacher?: { __typename?: 'Teacher', bio: string, avatarURL: string, name: string } | null } | null };

export type GetLessonsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLessonsQuery = { __typename?: 'Query', lessons: Array<{ __typename?: 'Lesson', id: string, lessonType: LessonType, slug: string, availableAt?: any | null, title: string }> };

export type GetTeamStandingsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamStandingsQuery = { __typename?: 'Query', teamStandings: Array<{ __typename?: 'TeamStanding', id: string, season: string, round: string, photo?: { __typename?: 'Asset', id: string, url: string, fileName: string } | null }> };

export type GetTeamsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetTeamsQuery = { __typename?: 'Query', teams: Array<{ __typename?: 'Team', id: string, name?: string | null, team?: string | null, photo?: { __typename?: 'Asset', id: string, url: string, fileName: string } | null }> };


export const CreateDriverDocument = gql`
    mutation CreateDriver($name: String!, $team: String!, $driverNumber: String!, $photo: AssetCreateOneInlineInput!) {
  createDriver(
    data: {name: $name, team: $team, driverNumber: $driverNumber, photo: $photo}
  ) {
    id
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
 *      name: // value for 'name'
 *      team: // value for 'team'
 *      driverNumber: // value for 'driverNumber'
 *      photo: // value for 'photo'
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
export const CreateDriverStandingDocument = gql`
    mutation CreateDriverStanding($season: String!, $round: String!, $photo: AssetCreateOneInlineInput!) {
  createDriverStanding(data: {season: $season, round: $round, photo: $photo}) {
    id
  }
}
    `;
export type CreateDriverStandingMutationFn = Apollo.MutationFunction<CreateDriverStandingMutation, CreateDriverStandingMutationVariables>;

/**
 * __useCreateDriverStandingMutation__
 *
 * To run a mutation, you first call `useCreateDriverStandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateDriverStandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createDriverStandingMutation, { data, loading, error }] = useCreateDriverStandingMutation({
 *   variables: {
 *      season: // value for 'season'
 *      round: // value for 'round'
 *      photo: // value for 'photo'
 *   },
 * });
 */
export function useCreateDriverStandingMutation(baseOptions?: Apollo.MutationHookOptions<CreateDriverStandingMutation, CreateDriverStandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateDriverStandingMutation, CreateDriverStandingMutationVariables>(CreateDriverStandingDocument, options);
      }
export type CreateDriverStandingMutationHookResult = ReturnType<typeof useCreateDriverStandingMutation>;
export type CreateDriverStandingMutationResult = Apollo.MutationResult<CreateDriverStandingMutation>;
export type CreateDriverStandingMutationOptions = Apollo.BaseMutationOptions<CreateDriverStandingMutation, CreateDriverStandingMutationVariables>;
export const CreateHallOfFameDocument = gql`
    mutation CreateHallOfFame($season: String!, $photo: AssetCreateOneInlineInput!) {
  createHallOfFame(data: {season: $season, photo: $photo}) {
    id
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
 *      season: // value for 'season'
 *      photo: // value for 'photo'
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
export const CreateTeamDocument = gql`
    mutation CreateTeam($name: String!, $team: String!, $photo: AssetCreateOneInlineInput!) {
  createTeam(data: {name: $name, team: $team, photo: $photo}) {
    id
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
 *      name: // value for 'name'
 *      team: // value for 'team'
 *      photo: // value for 'photo'
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
export const CreateTeamStandingDocument = gql`
    mutation CreateTeamStanding($season: String!, $round: String!, $photo: AssetCreateOneInlineInput!) {
  createTeamStanding(data: {season: $season, round: $round, photo: $photo}) {
    id
  }
}
    `;
export type CreateTeamStandingMutationFn = Apollo.MutationFunction<CreateTeamStandingMutation, CreateTeamStandingMutationVariables>;

/**
 * __useCreateTeamStandingMutation__
 *
 * To run a mutation, you first call `useCreateTeamStandingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateTeamStandingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createTeamStandingMutation, { data, loading, error }] = useCreateTeamStandingMutation({
 *   variables: {
 *      season: // value for 'season'
 *      round: // value for 'round'
 *      photo: // value for 'photo'
 *   },
 * });
 */
export function useCreateTeamStandingMutation(baseOptions?: Apollo.MutationHookOptions<CreateTeamStandingMutation, CreateTeamStandingMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateTeamStandingMutation, CreateTeamStandingMutationVariables>(CreateTeamStandingDocument, options);
      }
export type CreateTeamStandingMutationHookResult = ReturnType<typeof useCreateTeamStandingMutation>;
export type CreateTeamStandingMutationResult = Apollo.MutationResult<CreateTeamStandingMutation>;
export type CreateTeamStandingMutationOptions = Apollo.BaseMutationOptions<CreateTeamStandingMutation, CreateTeamStandingMutationVariables>;
export const GetHallsOfFameDocument = gql`
    query GetHallsOfFame {
  hallsOfFame(stage: PUBLISHED) {
    id
    season
    photo {
      id
      url
      fileName
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
export const GetDriverStandingsDocument = gql`
    query GetDriverStandings {
  driverStandings(stage: PUBLISHED) {
    id
    season
    round
    photo {
      id
      url
      fileName
    }
  }
}
    `;

/**
 * __useGetDriverStandingsQuery__
 *
 * To run a query within a React component, call `useGetDriverStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetDriverStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetDriverStandingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetDriverStandingsQuery(baseOptions?: Apollo.QueryHookOptions<GetDriverStandingsQuery, GetDriverStandingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetDriverStandingsQuery, GetDriverStandingsQueryVariables>(GetDriverStandingsDocument, options);
      }
export function useGetDriverStandingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetDriverStandingsQuery, GetDriverStandingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetDriverStandingsQuery, GetDriverStandingsQueryVariables>(GetDriverStandingsDocument, options);
        }
export type GetDriverStandingsQueryHookResult = ReturnType<typeof useGetDriverStandingsQuery>;
export type GetDriverStandingsLazyQueryHookResult = ReturnType<typeof useGetDriverStandingsLazyQuery>;
export type GetDriverStandingsQueryResult = Apollo.QueryResult<GetDriverStandingsQuery, GetDriverStandingsQueryVariables>;
export const GetDriversDocument = gql`
    query GetDrivers {
  drivers(stage: PUBLISHED) {
    id
    name
    driverNumber
    team
    photo {
      id
      url
      fileName
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
export const GetLessonBySlugDocument = gql`
    query GetLessonBySlug($slug: String) {
  lesson(where: {slug: $slug}) {
    title
    description
    videoId
    teacher {
      bio
      avatarURL
      name
    }
  }
}
    `;

/**
 * __useGetLessonBySlugQuery__
 *
 * To run a query within a React component, call `useGetLessonBySlugQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonBySlugQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonBySlugQuery({
 *   variables: {
 *      slug: // value for 'slug'
 *   },
 * });
 */
export function useGetLessonBySlugQuery(baseOptions?: Apollo.QueryHookOptions<GetLessonBySlugQuery, GetLessonBySlugQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLessonBySlugQuery, GetLessonBySlugQueryVariables>(GetLessonBySlugDocument, options);
      }
export function useGetLessonBySlugLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLessonBySlugQuery, GetLessonBySlugQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLessonBySlugQuery, GetLessonBySlugQueryVariables>(GetLessonBySlugDocument, options);
        }
export type GetLessonBySlugQueryHookResult = ReturnType<typeof useGetLessonBySlugQuery>;
export type GetLessonBySlugLazyQueryHookResult = ReturnType<typeof useGetLessonBySlugLazyQuery>;
export type GetLessonBySlugQueryResult = Apollo.QueryResult<GetLessonBySlugQuery, GetLessonBySlugQueryVariables>;
export const GetLessonsDocument = gql`
    query GetLessons {
  lessons(orderBy: availableAt_ASC, stage: PUBLISHED) {
    id
    lessonType
    slug
    availableAt
    title
  }
}
    `;

/**
 * __useGetLessonsQuery__
 *
 * To run a query within a React component, call `useGetLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLessonsQuery(baseOptions?: Apollo.QueryHookOptions<GetLessonsQuery, GetLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLessonsQuery, GetLessonsQueryVariables>(GetLessonsDocument, options);
      }
export function useGetLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLessonsQuery, GetLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLessonsQuery, GetLessonsQueryVariables>(GetLessonsDocument, options);
        }
export type GetLessonsQueryHookResult = ReturnType<typeof useGetLessonsQuery>;
export type GetLessonsLazyQueryHookResult = ReturnType<typeof useGetLessonsLazyQuery>;
export type GetLessonsQueryResult = Apollo.QueryResult<GetLessonsQuery, GetLessonsQueryVariables>;
export const GetTeamStandingsDocument = gql`
    query GetTeamStandings {
  teamStandings(stage: PUBLISHED) {
    id
    season
    round
    photo {
      id
      url
      fileName
    }
  }
}
    `;

/**
 * __useGetTeamStandingsQuery__
 *
 * To run a query within a React component, call `useGetTeamStandingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetTeamStandingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetTeamStandingsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetTeamStandingsQuery(baseOptions?: Apollo.QueryHookOptions<GetTeamStandingsQuery, GetTeamStandingsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetTeamStandingsQuery, GetTeamStandingsQueryVariables>(GetTeamStandingsDocument, options);
      }
export function useGetTeamStandingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetTeamStandingsQuery, GetTeamStandingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetTeamStandingsQuery, GetTeamStandingsQueryVariables>(GetTeamStandingsDocument, options);
        }
export type GetTeamStandingsQueryHookResult = ReturnType<typeof useGetTeamStandingsQuery>;
export type GetTeamStandingsLazyQueryHookResult = ReturnType<typeof useGetTeamStandingsLazyQuery>;
export type GetTeamStandingsQueryResult = Apollo.QueryResult<GetTeamStandingsQuery, GetTeamStandingsQueryVariables>;
export const GetTeamsDocument = gql`
    query GetTeams {
  teams(stage: PUBLISHED) {
    id
    name
    team
    photo {
      id
      url
      fileName
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