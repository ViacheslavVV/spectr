import { Injectable }              from '@angular/core';
import { Response }          from '@angular/http';
import { Headers, RequestOptions, RequestMethod } from '@angular/http';
import { GlobalSettings } from '../service/globalSettings';
import { HttpClient } from './httpClient';

import { FileItem, FileSelectDirective, FileDropDirective, FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { ToastyService, ToastyConfig, ToastOptions, ToastData} from 'ng2-toasty';
import { Modal } from 'ngx-modal';

import { Attachment, Manufacturer, Organization, QualityStandart, ResearchMethod, ResearchObjectType, ResearchPassport } from '../card/creationCard';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

const ATTACHMENT_FILE_URL = GlobalSettings.SERVER_ADDRESS+'/files/attfiles';
const RESEARCH_PASSPORT_FILE_URL = GlobalSettings.SERVER_ADDRESS+'/files/resfiles';
const CREATE_ATTACHMENT_URL = GlobalSettings.SERVER_ADDRESS+'/attach/add';
const CREATE_MANUFACTURER_URL = GlobalSettings.SERVER_ADDRESS+'/manufacturers/add';
const CREATE_ORGANIZATION_URL = GlobalSettings.SERVER_ADDRESS+'/organization/add';
const CREATE_QUALITY_STANDART_URL = GlobalSettings.SERVER_ADDRESS+'/qstandarts/add';
const CREATE_RESEARCH_METHOD_URL = GlobalSettings.SERVER_ADDRESS+'/resmethod/add';
const CREATE_RESEARCH_OBJECT_TYPE_URL = GlobalSettings.SERVER_ADDRESS+'/rotype/add';
const CREATE_RESEARCH_PASSPORT_URL = GlobalSettings.SERVER_ADDRESS+'/rpass/add';

@Injectable()
export class CreationsService {

  //TODO
  public attachmentUploader : FileUploader;
  public researchPassportUploader : FileUploader;

  private createAttachmentUploader(fileName : string) : void {
    this.attachmentUploader = new FileUploader({url : ATTACHMENT_FILE_URL, headers : [{name : 'filename', value : fileName}]});
  }

  private createResearchPassportUploader(fileName : string) : void {
    this.researchPassportUploader = new FileUploader({url : RESEARCH_PASSPORT_FILE_URL, headers : [{name : 'filename', value : fileName}]});
  }

	constructor ( private httpClient : HttpClient) {
	}

	
    public createAttachment(attachment : Attachment) : void {
      this.httpClient.post(CREATE_ATTACHMENT_URL, attachment).subscribe();
    }

    public createManufacturer(manufacturer : Manufacturer) : void {
      this.httpClient.post(CREATE_MANUFACTURER_URL, manufacturer).subscribe();
    }

    public createOrganization(organization : Organization) : void {
      this.httpClient.post(CREATE_ORGANIZATION_URL, organization).subscribe();
    }

    public createQualityStandart(qualityStandart : QualityStandart) : void {
      this.httpClient.post(CREATE_QUALITY_STANDART_URL, qualityStandart).subscribe();
    }

    public createResearchMethod(researchMethod : ResearchMethod) : void {
      this.httpClient.post(CREATE_RESEARCH_METHOD_URL, researchMethod).subscribe();
    }

    public createResearchObjectType(researchObjectType : ResearchObjectType) : void {
      this.httpClient.post(CREATE_RESEARCH_OBJECT_TYPE_URL, researchObjectType).subscribe();
    }

    public createResearchPassport(researchPassport : ResearchPassport) : void {
      this.httpClient.post(CREATE_RESEARCH_PASSPORT_URL, researchPassport).subscribe();
    }


}