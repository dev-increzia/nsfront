import { Injectable } 				 from "@angular/core";
import { AlertController, Platform } from "ionic-angular";
import { File } 					 from "@ionic-native/file";
import { FileChooser } 				 from '@ionic-native/file-chooser';
import { FilePath } 				 from '@ionic-native/file-path';
import { DocumentPicker } 			 from '@ionic-native/document-picker';


@Injectable()
export class FilesProvider {
	public acceptedMimeTypes = [
		'application/pdf',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/msexcel',
        'application/x-msexcel',
        'application/msword',
        'application/xls',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel',
        'application/powerpoint',
        'application/vnd.ms-powerpoint',
        'application/vnd.openxmlformats-officedocument.presentationml.presentation'
    ];
    
    constructor(
    	public alertCtrl	: AlertController,
    	public platform		: Platform,
    	private docPicker	: DocumentPicker,
        private fileChooser	: FileChooser,
        private filepath	: FilePath,
		private file		: File,
    	) 
    {
    }
    
    presentFileChooser(success, failure)
    {
	    if(this.platform.is('android')) 
	    {
            this.fileChooser.open().then(uri =>
            {
                this.filepath.resolveNativePath(uri).then(filePath =>
                {
	                const fileData = this.parseFilePath(filePath);
	                
                    this.file.readAsDataURL(fileData.directory,fileData.fileName).then(base64 =>
                    {
	                    const mimeTypeAllowed = this.allowedMimeType(base64);
	                    const fileSizeAllowed = this.allowedFileSize(base64);
	                    
	                    
                        if( fileSizeAllowed && mimeTypeAllowed )
                        {
	                        success(base64);
	                    }
                        else 
                        {
                            if( !fileSizeAllowed )
                            {
	                            this.generateFileSizeError();
                            }
                            else
                            {
	                            this.generateMimeTypeError();
	                        }
                        }
                    },
                    err =>
                    {
                        console.log(err);
                        throw err;
                    });
                    
                },err =>
                {
                    console.log(JSON.parse(err));
                    throw err;
                });
            },err =>
            {
                JSON.parse(JSON.stringify(err));

                throw err;
            });
        }
        else if( this.platform.is('ios') ) 
        {
            this.docPicker.getFile('all').then(uri =>
            {
	            const fileData = this.parseFilePath(uri);
                console.log(uri);
                this.file.readAsDataURL(fileData.directory,fileData.fileName).then(base64 =>
                {
                    const mimeTypeAllowed = this.allowedMimeType(base64);
                    const fileSizeAllowed = this.allowedFileSize(base64);
                    
                    if( fileSizeAllowed && mimeTypeAllowed )
                    {
                        success(base64);
                    }
                    else 
                    {
                        if( !fileSizeAllowed )
                        {
                            this.generateFileSizeError();
                        }
                        else
                        {
                            this.generateMimeTypeError();
                        }
                    }
                },
                err =>
                {
                    console.log(err);
                    throw err;
                });
	            
            },err =>
            {
                JSON.parse(JSON.stringify(err));
				
				console.log(err);
            });
        }
        else
        {
	        failure();
        }
    }
	
	allowedFileSize(base64)
	{
		const content_without_mime = base64.split(",")[1];
        const size_in_bytes = window.atob(content_without_mime).length;
        
		return size_in_bytes <= 5242880;
	}
	
	allowedMimeType(base64)
	{
        let base64ContentArray = base64.split(",");
        let mimeType = base64ContentArray[0].match(/[^:\s*]\w+\/[\w-+\d.]+(?=[;| ])/)[0];
        
        return this.acceptedMimeTypes.indexOf(mimeType) !== -1;
	}
	
	parseFilePath(filePath)
	{
		filePath = filePath.replace("file//:file//:","file//:");
        const directory = filePath.substring(0, filePath.lastIndexOf("/") + 1);
        const fileName = filePath.substring(filePath.lastIndexOf("/") + 1);
        
        return { directory : directory, fileName : fileName };
	}
	
	generateFileSizeError()
	{
		let errorAlert = this.alertCtrl.create({
            title: 'Attention',
            subTitle: 'Taille de fichier superieure à 5 Mo',
            buttons: [
                {
                    text: 'OK'

                }
            ]
        });
        errorAlert.present();
	}
	
	generateMimeTypeError()
	{
		let errorAlert = this.alertCtrl.create({
            title: 'Attention',
            subTitle: 'Format de fichier non supporté.',
            buttons: [
                {
                    text: 'OK'

                }
            ]
        });
        errorAlert.present();
	}
}
